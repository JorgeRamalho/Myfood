import { apiRequest, getStoredSession, setStoredSession } from "./client";

export { getStoredSession, setStoredSession };

export function getSession() {
  return getStoredSession();
}

export async function register({ name, email, password }) {
  const session = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  setStoredSession(session);
  return session;
}

export async function login({ email, password }) {
  const session = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStoredSession(session);
  return session;
}

export function logout() {
  setStoredSession(null);
}

export async function ensureGuestSession() {
  const existing = getStoredSession();
  if (existing?.accessToken && existing?.user) {
    return existing;
  }

  const session = await apiRequest("/auth/guest", { method: "POST" });
  setStoredSession(session);
  return session;
}

/** Sessão atual ou guest — usado no checkout e pedidos. */
export async function ensureAuthSession() {
  return ensureGuestSession();
}
