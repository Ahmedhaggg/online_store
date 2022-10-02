import { Alert, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "../components/user/cart/CartProducts";
import CartTotal from "../components/user/cart/CartTotal"
import cookies from "../services/cookies";
import { deleteCart } from "../store/user/cart";

export default function Cart() {
    let { socket, token } = useSelector(state => state.user);
    let [createOrderResult, setCreateOrderResult] = useState(null);
    let { items } = useSelector(state => state.cart);
    let dispatch = useDispatch();
    let router = useRouter();
    
    useEffect(() => {
        if (!token) return;

        socket.on("createOrderResult", (result) => {
            setCreateOrderResult(result)
        })

        return () => {
            socket.off('createOrderResult');
        }
    }, []);

    useEffect(() => {
        let timeout;

        if (createOrderResult?.status) {
            timeout = setTimeout(() => {
                setCreateOrderResult(null);
                dispatch(deleteCart());
                router.push("/orders")
            }, 2000)
        }

        return () => clearTimeout(timeout)
    }, [createOrderResult]);

    return (
        items.length > 0 ?
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <CartProducts />
                    {
                        createOrderResult?.status ? <Alert severity="success" sx={{ marginTop: 2 }}>order is created success</Alert>
                            :
                            createOrderResult?.status == false ? <Alert severity="error" sx={{ marginTop: 2 }} >order is created success</Alert>
                                : null
                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" marginBottom={2} color="primary.main">cart total</Typography>
                    <CartTotal />
                </Grid>
            </Grid> :
            <Alert severity="info">cart is empty</Alert>
    )
}
