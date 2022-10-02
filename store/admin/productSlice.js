import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const productSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                method: "GET",
                url: "products",
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        getProduct: builder.query({
            query: (id) => ({
                method: "GET",
                url: `products/${id}`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        createProduct: builder.mutation({
            query: (productData) => {
                let productFormData = new FormData();
                productFormData.append("title", productData.title);
                productFormData.append("categoryId", productData.categoryId);
                productFormData.append("image", productData.image);
                productFormData.append("price", productData.price);

                return {
                    method: "POST",
                    url: "products",
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    },
                    body: productFormData
                }
            }
        })
    })
})

export const { useCreateProductMutation, useGetAllProductsQuery } = productSlice;
export const { getAllProducts, getProduct } = productSlice.endpoints;