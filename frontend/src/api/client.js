import { API_BASE_URL } from "./config";

export class ApiError extends Error {
  constructor(message, { status = 0, body = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

const SESSION_KEY = "myfood.session";

export function getStoredSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredSession(session) {
  try {
    if (!session) {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("myfood.guest");
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem("myfood.guest");
  } catch {
    /* ignore */
  }
}

/**
 * @param {string} path - caminho relativo à base (ex: "/restaurants")
 * @param {RequestInit} [options]
 */
export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const session = getStoredSession();
  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(session?.accessToken
          ? { Authorization: `Bearer ${session.accessToken}` }
          : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError("API indisponível. Usando dados locais.", {
      status: 0,
    });
  }

  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && payload.message) ||
      `Erro HTTP ${response.status}`;
    throw new ApiError(
      Array.isArray(message) ? message.join(", ") : String(message),
      { status: response.status, body: payload },
    );
  }

  if (
    payload &&
    typeof payload === "object" &&
    Object.prototype.hasOwnProperty.call(payload, "data")
  ) {
    return payload.data;
  }

  return payload;
}
