import { apiRequest } from "./client";

/**
 * @param {{ category?: string, q?: string }} [params]
 */
export function listRestaurants(params = {}) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  const query = search.toString();
  return apiRequest(`/restaurants${query ? `?${query}` : ""}`);
}

export function listFeaturedRestaurants() {
  return apiRequest("/restaurants/featured");
}

export function getRestaurant(id) {
  return apiRequest(`/restaurants/${encodeURIComponent(id)}`);
}
