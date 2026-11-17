import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string | null;
};

const ACCESS_KEY = 'auth.accessToken';
const REFRESH_KEY = 'auth.refreshToken';

/**
 * SecureStore is native-only (Keychain / Keystore). On web we fall back to localStorage,
 * which any script on the page can read; prefer httpOnly cookies there if the server allows.
 */
const isWeb = Platform.OS === 'web';

async function read(key: string): Promise<string | null> {
  try {
    return isWeb
      ? (globalThis.localStorage?.getItem(key) ?? null)
      : await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function write(key: string, value: string | null | undefined): Promise<void> {
  try {
    if (isWeb) {
      if (value) globalThis.localStorage?.setItem(key, value);
      else globalThis.localStorage?.removeItem(key);
    } else if (value) {
      await SecureStore.setItemAsync(key, value);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch {
    // Storage can be unavailable (private browsing, locked keychain). The in-memory copy
    // still lets this session work; the user signs in again next launch.
  }
}

/** In-memory copy so every request doesn't hit storage. `undefined` means not loaded yet. */
let cache: AuthTokens | null | undefined;

export async function loadTokens(): Promise<AuthTokens | null> {
  if (cache !== undefined) return cache;
  const [accessToken, refreshToken] = await Promise.all([read(ACCESS_KEY), read(REFRESH_KEY)]);
  cache ??= accessToken ? { accessToken, refreshToken } : null;
  return cache;
}

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  cache = tokens;
  await Promise.all([
    write(ACCESS_KEY, tokens.accessToken),
    write(REFRESH_KEY, tokens.refreshToken),
  ]);
}

export async function clearTokens(): Promise<void> {
  cache = null;
  await Promise.all([write(ACCESS_KEY, null), write(REFRESH_KEY, null)]);
}

/** Test helper: forget the in-memory copy so the next load reads storage. */
export function resetTokenCache() {
  cache = undefined;
}
