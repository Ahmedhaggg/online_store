import React, { useEffect } from "react";
import {  useGetAllCategoriesQuery } from "../../../store/admin/categories";
import SectionHeader from "../../../components/admin/SectionHeader"
import { Alert, Box, Grid } from "@mui/material";
import CategoriesTable from "../../../components/admin/categories/CategoriesTable";
import CustomLinkButton from "../../../components/admin/CustomLinkButton";
import PageLoading from "../../../components/PageLoading";
import { useRouter } from "next/router";


export default function Index() {
    let { data, isLoading, isSuccess } = useGetAllCategoriesQuery();
    let router = useRouter();

    useEffect(() => {
        if (!isSuccess && !isLoading) router.push("/404")
    }, [isSuccess, isLoading]);

    return (
        isSuccess ?
            <Grid item xs={12} sm={10}>
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <SectionHeader text="categories" />
                    <Box textAlign="center" margin="0px auto">
                        {data.categories.length === 0 ? <Alert severity="info">no matched categories</Alert> :
                            <CategoriesTable rows={data.categories} />
                        }
                    </Box>
                    <Box>
                        <CustomLinkButton to="categories/create" text="add new category" />
                    </Box>
                </Box>
            </Grid> : <PageLoading />
    );
}

// export const getStaticProps = wrapper.getStaticProps((store) =>
//     async () => {
//         let categories = await store.dispatch(getAllCategories.initiate());
//         await Promise.all(getRunningOperationPromises());

//         if (categories.data)
//             return {
//                 props: {
//                     categories: categories.data.categories
//                 }
//             }
//     }
// )