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
  }),
});

export const { useGetAllTutorialQuery } = tutorialApi;
