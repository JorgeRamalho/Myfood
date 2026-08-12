import { ApiError } from "./client";

/**
 * Tenta a API; se falhar (rede/CORS/Nest off), usa factory de fallback.
 * @template T
 * @param {() => Promise<T>} apiCall
 * @param {() => T | Promise<T>} fallback
 * @returns {Promise<{ data: T, source: 'api' | 'fallback', error?: Error }>}
 */
export async function withFallback(apiCall, fallback) {
  try {
    const data = await apiCall();
    return { data, source: "api" };
  } catch (error) {
    const data = await fallback();
    return {
      data,
      source: "fallback",
      error: error instanceof Error ? error : new ApiError(String(error)),
    };
  }
}
