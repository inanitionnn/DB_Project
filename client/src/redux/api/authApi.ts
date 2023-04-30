import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  RegistrRequest,
  UserResponse,
} from "../../interfaces/auth.interfaces";
import { MyFetchBaseQueryError } from "../../interfaces/MyFetchBaseQueryError";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  MyFetchBaseQueryError
> = fetchBaseQuery({
  baseUrl: "/api/auth",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    registr: builder.mutation<UserResponse, RegistrRequest>({
      query: (newUser) => ({
        url: "/registration",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<UserResponse, LoginRequest>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegistrMutation, useLoginMutation } = authApi;
