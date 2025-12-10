import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // include cookies if your backend uses sessions
    prepareHeaders: (headers) => {
      // Ensure JSON content type for POST/PUT requests
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}), // endpoints will be injected in other slices
});
