import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Grid } from '@mui/material';
import { useRouter } from 'next/router';


export default function CartTotal() {
    let { items, totalPrice } = useSelector(state => state.cart);
    let { socket, userId } = useSelector(state => state.user);
    let { token } = useSelector(state => state.user)
    let router = useRouter();

    let createOrder = () => {
        if (!token)
            return router.push("/login");
        socket.emit("createOrder", { userId, orderData: { products: items, totalPrice, userId } });
    };

    return (
        <Box>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>products</Grid>
                <Grid item xs={3}>{items.length}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>all quantities</Grid>
                <Grid item xs={3}>{items.map(item => +item.quantity)}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>total price</Grid>
                <Grid item xs={3}>{totalPrice}</Grid>
            </Grid>
            <Button variant='contained' sx={{ marginTop: 2 }} onClick={createOrder}>checkout {totalPrice} $</Button>
        </Box>
    );
}
