import { TMeta } from "@/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLesson: build.mutation({
      query: (data) => ({
        url: "/lesson",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.lesson],
    }),
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
    getSingleLesson: build.query({
      query: (id: string) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.lesson],
    }),
    deleteLesson: build.mutation({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.lesson],
    }),
    updateLesson: build.mutation({
      query: (arg: any) => ({
        url: `/lesson/${arg.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: arg.data,
      }),
      invalidatesTags: [tagTypes.lesson],
    }),
    publishLesson: build.mutation({
      query: (id: string) => ({
        url: `/lesson/publish/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.lesson],
    }),
  }),
});

export const {
  useGetAllLessonQuery,
  useDeleteLessonMutation,
  useCreateLessonMutation,
  usePublishLessonMutation,
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} = lessonApi;
