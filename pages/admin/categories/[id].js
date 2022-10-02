import { Alert, Grid, Box } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React from "react";
import { adminTokenKey } from "../../../services/cookies/cookies_keys";
import { wrapper } from "../../../store/admin";
import { getCategory, getRunningOperationPromises } from "../../../store/admin/categories";
import SectionHeader from "../../../components/admin/SectionHeader"
import ProductItem from "../../../components/admin/category/ProductItem";

export default function Category({ category }) {

    return (
        <Grid item xs={12} sm={10}>
            <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px" >

                <SectionHeader text={category.title} />
                {
                    category.products.length === 0 ?
                        <Alert severity="info">This category contains no products</Alert>
                        : (
                            <Grid container>
                                {
                                    category.products.map(product => (
                                        <ProductItem product={product} />
                                    ))
                                }
                            </Grid>
                        )
                }
            </Box>
        </Grid>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        let { id } = context.params;
        let token = context.req.cookies[adminTokenKey];
        let { data, isSuccess, error } = await store.dispatch(getCategory.initiate({ id, token }))
        await Promise.all(getRunningOperationPromises());

        if (!isSuccess)
            return {
                redirect: {
                    destination: "/admin/categories",
                    permanent: true
                }
            };
        return {
            props: {
                category: data.category
            }
        }

    }
)