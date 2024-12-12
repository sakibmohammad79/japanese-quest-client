import { TMeta } from "@/types";

import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVocabulary: build.mutation({
      query: (data) => ({
        url: "/vocabulary",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.vocabulary],
    }),
    getAllVocabulary: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/vocabulary",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any, meta: TMeta) => {
        return {
          vocabularies: response,
          meta,
        };
      },
      providesTags: [tagTypes.vocabulary],
    }),
    getSingleVocabulary: build.query({
      query: (id: string) => ({
        url: `/vocabulary/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vocabulary],
    }),
    deleteVocabulary: build.mutation({
      query: (id) => ({
        url: `/vocabulary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vocabulary],
    }),

    updateVocabulary: build.mutation({
      query: (arg: any) => ({
        url: `/vocabulary/${arg.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: arg.data,
      }),
      invalidatesTags: [tagTypes.vocabulary],
    }),
  }),
});

export const {
  useGetAllVocabularyQuery,
  useDeleteVocabularyMutation,
  useCreateVocabularyMutation,
  useGetSingleVocabularyQuery,
  useUpdateVocabularyMutation,
} = vocabularyApi;
