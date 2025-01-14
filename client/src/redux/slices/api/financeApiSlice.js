import { apiSlice } from "../apiSlice";

const FINANCE_URL = "/finance";

export const financeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceStats: builder.query({
      query: () => ({
        url: `${FINANCE_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetFinanceStatsQuery } = financeApiSlice;
