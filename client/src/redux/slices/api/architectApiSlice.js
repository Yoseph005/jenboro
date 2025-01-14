import { apiSlice } from "../apiSlice";

const ARCHITECT_URL = "/architect";

export const architectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchitectStats: builder.query({
      query: () => ({
        url: `${ARCHITECT_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetArchitectStatsQuery } = architectApiSlice;
