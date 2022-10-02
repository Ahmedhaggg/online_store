import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import OrdersTable from "../../../components/admin/orders/OrdersTable";
import SectionHeader from "../../../components/admin/SectionHeader";
import PageLoading from "../../../components/PageLoading";
import { useGetAllOrdersQuery, useGetOrderQuery } from "../../../store/admin/orderSlice"

export default function index() {
    let router = useRouter();
    let { data, isSuccess, isLoading } = useGetAllOrdersQuery(null, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (!isLoading && !isSuccess)
            router.push("/404")
    }, [isLoading, isSuccess]);


    return (
        isSuccess ?
            <Grid item xs={12} sm={10} >
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <SectionHeader text="orders" />
                    <Box textAlign="center" margin="0px auto">
                        {data.orders.length === 0 ? <Alert severity="info">no orders</Alert> :
                            <OrdersTable rows={data.orders} />
                        }
                    </Box>
                </Box>
            </Grid>
            : <PageLoading />
    )
}
