import { useQueryClient } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { onUnauthorized } from '@/lib/auth/auth-events';
import { type AuthTokens, clearTokens, loadTokens, saveTokens } from '@/lib/auth/token-storage';

export type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

type AuthContextValue = {
  status: AuthStatus;
  isAuthenticated: boolean;
  /** Store tokens returned by your login endpoint. */
  signIn: (tokens: AuthTokens) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Must be rendered inside QueryProvider. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let active = true;
    loadTokens().then((tokens) => {
      if (active) setStatus(tokens ? 'signedIn' : 'signedOut');
    });
    // The axios interceptor emits this when a 401 can't be fixed by refreshing.
    const unsubscribe = onUnauthorized(() => setStatus('signedOut'));
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isAuthenticated: status === 'signedIn',
      signIn: async (tokens) => {
        await saveTokens(tokens);
        setStatus('signedIn');
      },
      signOut: async () => {
        await clearTokens();
        queryClient.clear();
        setStatus('signedOut');
      },
    }),
    [status, queryClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>.');
  return context;
}
