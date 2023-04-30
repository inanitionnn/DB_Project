import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { MyFetchBaseQueryError } from "../../interfaces/MyFetchBaseQueryError";
import {
  CartRequest,
  CartResponse,
  ICartProduct,
} from "../../interfaces/cart.interfaces";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  MyFetchBaseQueryError
> = fetchBaseQuery({
  baseUrl: "/api/cart",
});

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery,
  tagTypes: ["Cart"],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    addProduct: builder.mutation<CartResponse, CartRequest>({
      query: (request) => ({
        url: "/add",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Cart"],
    }),
    subtractProduct: builder.mutation<CartResponse, CartRequest>({
      query: (request) => ({
        url: "/subtract",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteProducts: builder.mutation<ICartProduct[], string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query<CartResponse, string>({
      query: (userId) => `/${userId}`,
    }),
  }),
});

export const {
  useDeleteProductsMutation,
  useSubtractProductMutation,
  useAddProductMutation,
  useGetCartQuery,
} = cartApi;
