/**
 * Base da API Nest.
 * - Dev Vite: use proxy relativo `/api` (vite.config.js)
 * - Live Server / preview: URL absoluta
 */
const envUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL =
  typeof envUrl === "string" && envUrl.trim().length > 0
    ? envUrl.replace(/\/$/, "")
    : import.meta.env.DEV
      ? "/api"
      : "http://127.0.0.1:3333/api";
