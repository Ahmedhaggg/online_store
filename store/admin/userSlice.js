import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const userSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => ({
                method: "GET",
                url: "users",
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        getUser: builder.query({
            query: (userId) => ({
                method: "GET",
                url: `users/${userId}`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        })
    })
})

export const { useGetAllUsersQuery, useGetUserQuery, util: { getRunningOperationPromises } } = userSlice;
export const { getUser } = userSlice.endpoints;