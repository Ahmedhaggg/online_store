import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const orderSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: () => ({
                method: "GET",
                url: `orders`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        getOrder: builder.query({
            query: ({ orderId, adminToken }) => {
                return {
                    method: "GET",
                    url: `orders/${orderId}`,
                    headers: {
                        "authorization": adminToken
                    }
                }
            }
        })
    })
});

export const { useGetAllOrdersQuery, util: { getRunningOperationPromises } } = orderSlice;
export const { getOrder, getAllOrders } = orderSlice.endpoints;
