// Base URLs
export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
export const API_PREFIX = "/api";
export const API_URL = `${BASE_URL}${API_PREFIX}`;

// API endpoints
export const USERS_URL = `${API_URL}/users`;
export const CATEGORY_URL = `${API_URL}/category`;
export const PRODUCT_URL = `${API_URL}/products`;
export const UPLOAD_URL = `${API_URL}/upload`;
export const ORDERS_URL = `${API_URL}/orders`;
export const PAYPAL_URL = `${API_URL}/config/paypal`;

// Optional: helper function for dynamic product URLs
export const PRODUCT_DETAIL_URL = (id) => `${PRODUCT_URL}/${id}`;
