import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../next.config"
import { HYDRATE } from "next-redux-wrapper";

export const UserApiSlice = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE)
            return action.payload[reducerPath]
    },
    reducerPath: "userApiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
    endpoints: builder => ({

    })
})