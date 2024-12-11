import { TMeta } from "@/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/user",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    softDeleteUser: build.mutation({
      query: (id) => ({
        url: `/user/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (arg: any) => ({
        url: `/user/${arg.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: arg.data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUserStatus: build.mutation({
      query: (arg: any) => ({
        url: `/user/${arg?.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: arg?.data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {} = userApi;
