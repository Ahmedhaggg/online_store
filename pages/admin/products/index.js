import { Alert, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomLinkButton from "../../../components/admin/CustomLinkButton";
import SectionHeader from "../../../components/admin/SectionHeader";
import { wrapper } from "../../../store/admin";
import { getAllProducts, getRunningOperationPromises, useGetAllProductsQuery } from "../../../store/admin/productSlice";
import ProductsTable from "../../../components/admin/products/ProductsTable"
import cookies from "../../../services/cookies";
import { adminTokenKey } from "../../../services/cookies/cookies_keys";
import PageLoading from "../../../components/PageLoading"
import { useRouter } from "next/router";
export default function Products() {
    let { isSuccess, isLoading, data } = useGetAllProductsQuery();
    let router = useRouter()

    useEffect(() => {
        if (!isLoading && !isSuccess)
            router.push("/404")
    }, [isLoading, isSuccess])

    return (

        isSuccess ?
            <Grid item xs={12} sm={10} >
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <SectionHeader text="products" />
                    <Box textAlign="center" margin="0px auto">
                        {data.products.length === 0 ? <Alert severity="info">no matched products</Alert> :
                            <ProductsTable rows={data.products} />
                        }
                    </Box>
                    <Box>
                        <CustomLinkButton to="products/create" text="add new product" />
                    </Box>
                </Box>
            </Grid>
            : <PageLoading />
    );
}


// export const getStaticProps = wrapper.getStaticProps((store) =>
//     async (context) => {
//         let products = await store.dispatch(getAllProducts.initiate(cookies.get(adminTokenKey)));
//         await Promise.all(getRunningOperationPromises());

//         if (products.data)
//             return {
//                 props: {
//                     products: products.data.products
//                 }
//             }
//     }
// )