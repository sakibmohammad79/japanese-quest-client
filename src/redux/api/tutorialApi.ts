import { TMeta } from "@/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTutorial: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/tutorial",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          tutorials: response,
          meta,
        };
      },
      providesTags: [tagTypes.tutorial],
    }),
    getSingleTutorial: build.query({
      query: (id: string) => ({
        url: `/tutorial/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.tutorial],
    }),
    createTutorial: build.mutation({
      query: (data) => ({
        url: "/tutorial",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.tutorial],
    }),
    deleteTutorial: build.mutation({
      query: (id) => ({
        url: `/tutorial/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tutorial],
    }),
    updateTutorial: build.mutation({
      query: (arg: any) => ({
        url: `/tutorial/${arg.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: arg.data,
      }),
      invalidatesTags: [tagTypes.tutorial],
    }),
  }),
});

export const {
  useGetAllTutorialQuery,
  useCreateTutorialMutation,
  useDeleteTutorialMutation,
  useUpdateTutorialMutation,
  useGetSingleTutorialQuery,
} = tutorialApi;
