import { useQuery } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react-native';
import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { Text } from 'react-native';

import { emitUnauthorized } from '@/lib/auth/auth-events';
import { resetTokenCache, saveTokens } from '@/lib/auth/token-storage';
import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { createQueryClient, QueryProvider, shouldRetry } from '@/providers/query-provider';

jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    getItemAsync: async (key: string) => store.get(key) ?? null,
    setItemAsync: async (key: string, value: string) => void store.set(key, value),
    deleteItemAsync: async (key: string) => void store.delete(key),
  };
});
jest.mock('expo-network', () => ({
  addNetworkStateListener: () => ({ remove: () => {} }),
}));

function errorWithStatus(status: number) {
  const config = { headers: {} } as InternalAxiosRequestConfig;
  const response = { status, config } as AxiosResponse;
  return new AxiosError('failed', 'ERR_BAD_REQUEST', config, null, response);
}

describe('shouldRetry', () => {
  it('never retries client errors', () => {
    expect(shouldRetry(0, errorWithStatus(401))).toBe(false);
    expect(shouldRetry(0, errorWithStatus(404))).toBe(false);
  });

  it('retries server and network errors twice', () => {
    expect(shouldRetry(0, errorWithStatus(500))).toBe(true);
    expect(shouldRetry(1, new Error('Network Error'))).toBe(true);
    expect(shouldRetry(2, errorWithStatus(503))).toBe(false);
  });
});

function Status() {
  const { status } = useAuth();
  const { data } = useQuery({ queryKey: ['secret'], queryFn: () => 'private data' });
  return (
    <>
      <Text>{status}</Text>
      <Text>{data ?? 'no data'}</Text>
    </>
  );
}

it('restores the session, then signs out and clears cached data on unauthorized', async () => {
  resetTokenCache();
  await saveTokens({ accessToken: 'abc' });
  const client = createQueryClient();
  // No garbage-collection timers, so Jest can exit.
  client.setDefaultOptions({
    queries: { ...client.getDefaultOptions().queries, gcTime: Infinity },
  });
  const clear = jest.spyOn(client, 'clear');

  const { unmount } = await render(
    <QueryProvider client={client}>
      <AuthProvider>
        <Status />
      </AuthProvider>
    </QueryProvider>,
  );

  expect(await screen.findByText('signedIn')).toBeOnTheScreen();
  expect(await screen.findByText('private data')).toBeOnTheScreen();

  await act(async () => emitUnauthorized());

  expect(screen.getByText('signedOut')).toBeOnTheScreen();
  expect(clear).toHaveBeenCalledTimes(1);
  await unmount();
});
