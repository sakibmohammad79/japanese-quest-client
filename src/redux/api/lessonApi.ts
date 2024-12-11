import { TMeta } from "@/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createUser: build.mutation({
    //   query: (data) => ({
    //     url: "/user",
    //     method: "POST",
    //     contentType: "application/json",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.user],
    // }),
    getAllLesson: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/lesson",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          lessons: response,
          meta,
        };
      },
      providesTags: [tagTypes.lesson],
    }),
    // getSingleUser: build.query({
    //   query: (id: string) => ({
    //     url: `/user/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.user],
    // }),
    deleteLesson: build.mutation({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.lesson],
    }),

    // updateUser: build.mutation({
    //   query: (arg: any) => ({
    //     url: `/user/${arg.id}`,
    //     method: "PATCH",
    //     contentType: "application/json",
    //     data: arg.data,
    //   }),
    //   invalidatesTags: [tagTypes.user],
    // }),
    // updateUserStatus: build.mutation({
    //   query: (arg: any) => ({
    //     url: `/user/${arg?.id}`,
    //     method: "PATCH",
    //     contentType: "application/json",
    //     data: arg?.data,
    //   }),
    //   invalidatesTags: [tagTypes.user],
    // }),
  }),
});

export const { useGetAllLessonQuery, useDeleteLessonMutation } = lessonApi;
