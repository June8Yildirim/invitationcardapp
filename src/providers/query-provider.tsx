import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import * as Network from 'expo-network';
import { type ReactNode, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { errorStatus } from '@/lib/api/client';
import { onUnauthorized } from '@/lib/auth/auth-events';

/** Retry network and server errors up to twice; never retry client errors like 401 or 404. */
export function shouldRetry(failureCount: number, error: unknown) {
  const status = errorStatus(error);
  if (status !== undefined && status >= 400 && status < 500) return false;
  return failureCount < 2;
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: shouldRetry },
      mutations: { retry: false },
    },
  });
}

type QueryProviderProps = {
  children: ReactNode;
  /** Pass a client in tests; the app creates its own. */
  client?: QueryClient;
};

export function QueryProvider({ children, client }: QueryProviderProps) {
  const [queryClient] = useState(() => client ?? createQueryClient());

  // Refetch stale queries when the app comes back to the foreground (the browser does this on web).
  useEffect(() => {
    if (Platform.OS === 'web') return;
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });
    return () => subscription.remove();
  }, []);

  // Pause queries while offline and resume when the connection returns.
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const subscription = Network.addNetworkStateListener((state) => {
        setOnline(state.isInternetReachable ?? state.isConnected ?? true);
      });
      return () => subscription.remove();
    });
  }, []);

  // A rejected session must not leave the previous user's data in the cache.
  useEffect(() => onUnauthorized(() => queryClient.clear()), [queryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
