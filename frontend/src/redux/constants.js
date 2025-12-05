const PROD_BASE_URL = "https://ecom-store-mern-backend.onrender.com";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || PROD_BASE_URL; // Vite env fallback

export const USERS_URL = `${BASE_URL}/api/users`;
export const CATEGORY_URL = `${BASE_URL}/api/category`;
export const PRODUCT_URL = `${BASE_URL}/api/products`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
