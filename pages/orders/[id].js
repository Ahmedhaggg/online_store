import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderProducts from "../../components/user/order/OrderProducts";
import { userTokenKey } from "../../services/cookies/cookies_keys";
import { wrapper } from "../../store/user/index"
import { getOrder, getRunningOperationPromises } from "../../store/user/orderSlice";
import OrderDetails from "../../components/user/order/OrderDetails";
export default function Order({ order }) {
    return (
        <Box>
            <Typography sx={{ fontSize: "fontSizes.large", color: "primary.main", textAlign: "center", marginBottom: 3 }}>Order Details</Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <OrderProducts orderProducts={order.products} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <OrderDetails order={order} />
                </Grid>
            </Grid>
        </Box>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        let { id } = context.params;

        let { data, isSuccess, error } = await store.dispatch(
            getOrder.initiate({ id, userToken: context.req.cookies[userTokenKey] })
        );

        await Promise.all(getRunningOperationPromises());

        if (!isSuccess)
            return {
                redirect: {
                    destination: "/404",
                    permanent: true
                }
            };
        return {
            props: {
                order: data.order
            }
        }

    }
)