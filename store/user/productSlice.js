import { env } from "../../next.config";
import { UserApiSlice } from "./userApiSlice";

export const productSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                method: "GET",
                url: "products",
                headers: {
                    Origin: env.URL
                }
            })
        }),
        getProduct: builder.query({
            query: (id) => ({
                method: "GET",
                url: `products/${id}`,
                headers: {
                    Origin: env.URL
                }
            })
        })
    })
})

export const {  util: { getRunningOperationPromises } } = productSlice;
export const { getAllProducts, getProduct } = productSlice.endpoints;