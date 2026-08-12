import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ensureGuestSession as apiEnsureGuest,
  getSession,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  const value = useMemo(() => {
    const user = session?.user ?? null;
    const isGuest = !user?.email;

    return {
      ready,
      session,
      user,
      token: session?.accessToken ?? null,
      isGuest,
      isAuthenticated: Boolean(session?.accessToken),
      async login(credentials) {
        const next = await apiLogin(credentials);
        setSession(next);
        return next;
      },
      async register(payload) {
        const next = await apiRegister(payload);
        setSession(next);
        return next;
      },
      logout() {
        apiLogout();
        setSession(null);
      },
      async ensureGuest() {
        const next = await apiEnsureGuest();
        setSession(next);
        return next;
      },
      async ensureAuthSession() {
        const current = getSession();
        if (current?.accessToken) {
          setSession(current);
          return current;
        }
        const next = await apiEnsureGuest();
        setSession(next);
        return next;
      },
    };
  }, [ready, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
