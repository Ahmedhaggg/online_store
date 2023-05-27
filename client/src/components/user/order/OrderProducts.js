import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { env } from "../../../next.config"

export default function OrderProducts({ orderProducts }) {

    return (
        orderProducts.map(orderItem => (
            <Box sx={{ border: 1, borderColor: "#eee", marginBottom: 3 }} key={orderItem._id}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Box height="100%" sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: { xs: 3, md: 0 } }}>
                            <img
                                src={orderItem.product.image}
                                alt={orderItem.product.image}
                                loading="lazy"
                                width="160px"
                                height="170px"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ padding: 3 }}>
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 1, paddingBottom: 1 }}>
                                <Typography variant="body1">title</Typography>
                                <Typography variant="body1">{orderItem.product.title}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 1, paddingBottom: 1 }}>
                                <Typography variant="body1">price</Typography>
                                <Typography variant="body1">{orderItem.product.price}$</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 1, paddingBottom: 1 }}>
                                <Typography variant="body1">quantity</Typography>
                                <Typography variant="body1">{orderItem.quantity}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 1, paddingBottom: 1 }}>
                                <Typography variant="body1">totalPrice</Typography>
                                <Typography variant="body1">{orderItem.product.price * orderItem.quantity}$</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        ))

    )
}
