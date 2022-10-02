import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const staticSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatics: builder.query({
            query: () => ({
                method: "GET",
                url: `statics`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        })
    })
});

export const { useGetStaticsQuery } = staticSlice;
