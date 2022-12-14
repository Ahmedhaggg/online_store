import { UserApiSlice } from "./userApiSlice";
import cookies from "../../services/cookies"
import { userTokenKey } from "../../services/cookies/cookies_keys"
import { env } from "../../next.config";

export const notificationSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => ({
                method: "GET",
                url: "orders",
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            })
        }),
        getOrder: builder.query({
            query: ({ id, userToken }) => ({
                method: "GET",
                url: "orders/" + id,
                headers: {
                    'authorization': userToken,
                    Origin: env.URI
                }
            })
        })
    })
})

export const { useGetOrdersQuery, util: { getRunningOperationPromises } } = notificationSlice;
export const { getOrder } = notificationSlice.endpoints;