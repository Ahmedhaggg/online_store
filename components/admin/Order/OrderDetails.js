import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Divider, Grid, Input } from '@mui/material';
import SelectInput from '../SelectInput';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

let orderStatus = [
    {
        _id: "shipped",
        name: "shipped"
    },
    {
        _id: "completed",
        name: "completed"
    }
]
export default function OrderDetails({ order }) {
    let { socket } = useSelector(state => state.auth)
    let [orderData, setOrderData] = useState(order);
    let [updateOrderError, setUpdateOrderError] = useState(null);



    let updateOrder = (status) => {
        setUpdateOrderError(null);
        socket.emit("updateOrder", { orderId: order._id, userId: order.user._id, status: status })
    }

    useEffect(() => {
        if (order.status === "sent")
            socket.emit("updateOrder", { orderId: order._id, userId: order.user._id, status: "recieved" })

        socket.on("updateOrderResult", result => {
            result.status ?
                setOrderData({
                    ...orderData,
                    status: result.orderStutus
                })
                :
                setUpdateOrderError(result)
        });

        return () => {
            socket.off("updateOrderResult")
        }
    }, []);

    let nextStatus = orderData.status === "sent" || orderData.status === "recieved" ? "shipped" : "completed";
    return (
        <Box>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>total price</Grid>
                <Grid item xs={3}>{order.totalPrice}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2} marginBottom={3}>
                <Grid item xs={9}>status</Grid>
                <Grid item xs={3}>{orderData.status}</Grid>
            </Grid>
            {
                orderData.status === "completed" ? null :
                    <Grid container spacing={3} alignItems="center" >
                        <Grid item xs={9}>
                            <Button variant='contained' type="button"
                                onClick={() => updateOrder(nextStatus)} >
                                {
                                    nextStatus
                                }
                            </Button>
                        </Grid>
                    </Grid>
            }
            {updateOrderError && <Alert severity="error">something went wrong when update order</Alert>}
        </Box>
    );
}