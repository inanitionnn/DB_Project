import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { MyFetchBaseQueryError } from "../../interfaces/MyFetchBaseQueryError";
import { IProduct } from "../../interfaces/product.interfaces";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  MyFetchBaseQueryError
> = fetchBaseQuery({
  baseUrl: "/api/products",
});

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  tagTypes: ["Product"],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
