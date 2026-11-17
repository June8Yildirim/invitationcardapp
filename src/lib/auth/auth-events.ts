/**
 * Fired when the API rejects the session and it can't be refreshed.
 * The axios client emits it; React providers listen to sign the user out and clear cached data.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

export function onUnauthorized(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitUnauthorized() {
  for (const listener of listeners) listener();
}
