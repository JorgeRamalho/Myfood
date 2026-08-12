import { apiRequest } from "./client";

export function getRestaurantMenu(restaurantId) {
  return apiRequest(
    `/restaurants/${encodeURIComponent(restaurantId)}/menu`,
  );
}
