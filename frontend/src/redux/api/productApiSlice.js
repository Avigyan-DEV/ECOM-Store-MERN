import { BASE_URL, PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get products with optional search keyword
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${BASE_URL}/${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    // Get product by ID
    getProductById: builder.query({
      query: (productId) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/${productId}`,
      }),
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // Get all products
    allProducts: builder.query({
      query: () => `${BASE_URL}/${PRODUCT_URL}/allProducts`,
    }),

    // Get product details (duplicate of getProductById, optional)
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Create new product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${BASE_URL}/${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // Upload product image
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: `${BASE_URL}/${UPLOAD_URL}`, // full backend URL
        method: "POST",
        body: formData,
      }),
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Create review for a product
    createReview: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    // Get top products
    getTopProducts: builder.query({
      query: () => `${BASE_URL}/${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),

    // Get new products
    getNewProducts: builder.query({
      query: () => `${BASE_URL}/${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5,
    }),

    // Get filtered products
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${BASE_URL}/${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
