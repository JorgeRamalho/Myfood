import { apiRequest } from "./client";

export function listOrders() {
  return apiRequest("/orders");
}

export function listManagedOrders() {
  return apiRequest("/orders/manage");
}

/**
 * @param {{
 *   restaurantId: string,
 *   restaurantName: string,
 *   items: Array<{ menuItemId: string, name: string, quantity: number, price: number }>
 * }} payload
 */
export function createOrder(payload) {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * @param {string} orderId
 * @param {'preparando'|'a_caminho'|'entregue'|'cancelado'} status
 */
export function updateOrderStatus(orderId, status) {
  return apiRequest(`/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
