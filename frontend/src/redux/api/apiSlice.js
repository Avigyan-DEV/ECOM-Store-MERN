import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // e.g., https://ecom-store-mern-backend.onrender.com
    // credentials: "include", // include cookies if your backend uses sessions
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}), // endpoints injected in other slices
});
