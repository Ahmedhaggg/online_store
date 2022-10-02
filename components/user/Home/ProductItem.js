import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { env } from '../../../next.config';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { addItemToCart } from '../../../store/user/cart';
import { useDispatch, useSelector } from 'react-redux';
export default function ProductItem({ product }) {
    let state = useSelector(state => state.cart);
    let dispatch = useDispatch();

    let addProductToCart = () => {
        dispatch(addItemToCart({ ...product, quantity: 1 }))
    }

    return (
        <Card sx={{ padding: 2 }}>
            <CardActionArea sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <CardMedia
                    component="img"
                    // height="200"
                    image={env.IMAGE_URL + product.image}
                    crossOrigin="anonymous"
                    alt={product.title}
                    sx={{ maxWidth: "250px", height: "200px", display: "flex", justifyContent: "center" }}
                />
                <CardContent sx={{ textAlign: "left", width: "100%" }}>
                    <Typography gutterBottom variant="p" component="div">
                        name: {product.title}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        price: {product.price}$
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={addProductToCart}>
                    <ShoppingCartCheckoutIcon sx={{ marginRight: 2 }} />
                    add to cart
                </Button>
            </CardActions>
        </Card>
    );
}
