import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { store } from "../redux/store"; // import your Redux store

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // include cookies if your backend uses sessions
  prepareHeaders: (headers) => {
    // Get token from Redux store
    const state = store.getState();
    const token = state.auth.user?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Don't set Content-Type here, because FormData will automatically set it
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}), // endpoints will be injected in other slices
});
