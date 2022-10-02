import React, { useEffect } from "react";
import { useRouter } from "next/router";
import UsersTable from "../../../components/admin/users/UsersTable";
import PageLoading from "../../../components/PageLoading";
import { useGetAllUsersQuery } from "../../../store/admin/userSlice";
import SectionHeader from "../../../components/admin/SectionHeader";
import { Box, Grid, Alert } from "@mui/material";
import CustomLinkButton from "../../../components/admin/CustomLinkButton";

export default function index() {
    let router = useRouter();
    let { data, isSuccess, isLoading } = useGetAllUsersQuery();

    useEffect(() => {
        if (!isSuccess && !isLoading) router.push("/404")
    }, [isSuccess, isLoading]);

    return (

        isSuccess ?
            <Grid item xs={12} sm={10}>
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <SectionHeader text="users" />
                    <Box textAlign="center" margin="0px auto">
                        {data.users.length === 0 ? <Alert severity="info">no matched users</Alert> :
                            <UsersTable rows={data.users} />
                        }
                    </Box>
                </Box>
            </Grid>
            : <PageLoading />
    );
}

