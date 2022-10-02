import React, { useEffect } from "react";
import { wrapper } from "../../store/admin";
import { useGetStaticsQuery } from "../../store/admin/staticSlice";
import PageLoading from "../../components/PageLoading"
import { useRouter } from "next/router";
import Statics from "../../components/admin/statics/Statics"
import { Grid, Box } from "@mui/material";
import SectionHeader from "../../components/admin/SectionHeader";

export default function index() {
    let router = useRouter();
    let { data, isLoading, isSuccess } = useGetStaticsQuery();

    useEffect(() => {
        if (!isLoading && !isSuccess)
            router.push("/404");
    }, [isLoading, isSuccess]);

    return (
        !isSuccess ? <PageLoading /> : (
            <Grid item xs={12} sm={10}>
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <SectionHeader text="statics" />
                    <Box textAlign="center" margin="0px auto">
                        <Statics stats={data.statics} />
                    </Box>
                </Box>
            </Grid>
        )
    )
};
