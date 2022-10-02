import { env } from "../../next.config";
import { UserApiSlice } from "./userApiSlice";

export const categorySlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                method: "GET",
                url: "categories",
                headers: {
                    Origin: env.URI
                }
            })
        }),
        getCategory: builder.query({
            query: (title) => ({
                method: "GET",
                url: `categories/${title}`,
                headers: {
                    Origin: env.URI
                }
            })
        })
    })
})

export const { useGetAllCategoriesQuery , util: { getRunningOperationPromises } } = categorySlice;
export const { getAllCategories, getCategory } = categorySlice.endpoints;