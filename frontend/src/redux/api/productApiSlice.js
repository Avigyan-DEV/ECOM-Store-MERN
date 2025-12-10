import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `/api/products`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (productId) => `/api/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    allProducts: builder.query({
      query: () => `/api/products/allProducts`,
    }),

    getProductDetails: builder.query({
      query: (productId) => `/api/products/${productId}`,
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/api/products`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/api/products/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: `/api/upload`,
        method: "POST",
        body: formData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getTopProducts: builder.query({
      query: () => `/api/products/top`,
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => `/api/products/new`,
      keepUnusedDataFor: 5,
    }),

    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `/api/products/filtered-products`,
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
