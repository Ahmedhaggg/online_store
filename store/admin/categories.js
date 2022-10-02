import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const categorySlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                method: "GET",
                url: "categories",
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        getCategory: builder.query({
            query: ({ id, token }) => {
                return {
                    method: "GET",
                    url: `categories/${id}`,
                    headers: {
                        "authorization": token
                    }
                }
            }
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "categories",
                headers: {
                    "authorization": cookies.get(adminTokenKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }),

    })
})

export const { useCreateCategoryMutation, useGetAllCategoriesQuery, util: { getRunningOperationPromises } } = categorySlice;
export const { getAllCategories, getCategory } = categorySlice.endpoints;