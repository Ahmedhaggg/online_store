import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useSelector } from 'react-redux';


export default function OrderDetails({ order }) {
  let { socket } = useSelector(state => state.user)
  let [newOrderStatus, setNewOrderStatus] = useState(order.status);

  useEffect(() => {
    socket.on("ordersNotifications", data => {
      if (data.order.orderId === order._id)
        setNewOrderStatus(data.order.status)
    });

    return () => {
      socket.off("ordersNotifications");
    }

  }, [socket]);

  return (
    <Box>
      <Grid container paddingTop={2} paddingBottom={2}>
        <Grid item xs={9}>total price</Grid>
        <Grid item xs={3}>{order.totalPrice}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2}>
        <Grid item xs={9}>status</Grid>
        <Grid item xs={3}>{newOrderStatus}</Grid>
      </Grid>
    </Box>
  );
}