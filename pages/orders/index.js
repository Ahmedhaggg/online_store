import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrdersTable from "../../components/user/orders/OrdersTable";
import { useGetOrdersQuery } from "../../store/user/orderSlice";
import PageLoading from "../../components/PageLoading"

export default function order() {
    let { token } = useSelector(state => state.user);
    let router = useRouter();
    let { data, isSuccess } = useGetOrdersQuery(null, { skip: token ? false : true, refetchOnMountOrArgChange: true });

    useEffect(() => { if (!token) router.push("/login") }, []);

    return (
        <>
            {
                isSuccess && data.orders.length > 0 ? <OrdersTable orders={data.orders} />
                    : isSuccess && data.orders.length == 0 ? <Alert severity="info">There are no current requests</Alert>
                        : <PageLoading />
            }
        </>
    );

}