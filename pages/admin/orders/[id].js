import React from "react";
import { adminTokenKey } from "../../../services/cookies/cookies_keys";
import { wrapper } from "../../../store/admin"
import { getOrder, getRunningOperationPromises } from "../../../store/admin/orderSlice";
import { Grid } from "@mui/material";
import SectionHeader from "../../../components/admin/SectionHeader";
import OrderProducts from "../../../components/admin/Order/OrderProducts";
import OrderDetails from "../../../components/admin/Order/OrderDetails";

export default function order({ order }) {
  return (
    <Grid item xs={12} sm={10}>
      <SectionHeader text="order" />
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <OrderProducts orderProducts={order.products} />
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderDetails order={order} />
        </Grid>
      </Grid>
    </Grid>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store =>
  async (context) => {
    let { isSuccess, data, error } = await store.dispatch(getOrder.initiate({
      orderId: context.params.id,
      adminToken: context.req.cookies[adminTokenKey]
    }));

    await Promise.all(getRunningOperationPromises());

    if (!isSuccess)
      return {
        redirect: {
          permanent: false,
          destination: "/admin/404"
        }
      }

    return {
      props: {
        order: data.order
      }
    }
  }
)