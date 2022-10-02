import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLink from "../CustomLink"
import { useSelector } from "react-redux"

export default function OrdersTable({ orders }) {
    let { socket } = useSelector(state => state.user);
    let [updatedOrders, setUpdatedOrders] = useState(orders);

    useEffect(() => {
        socket.on("ordersNotifications", data => {
            setUpdatedOrders(lastState => {
                let neworders = []
                lastState.forEach(order => {
                    neworders.push({
                        ...order,
                        status: data.order.orderId === order._id ? data.order.status : order.status
                    });
                })
                return neworders;

            })
        });

        return () => {
            socket.off("ordersNotifications");
        }

    }, [socket]);

    return (
        <div>
            <TableContainer component={Paper} sx={{ maxWidth: { xs: "100%", sm: "100%" } }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRowStyle>
                            <TableCellStyle>id</TableCellStyle>
                            <TableCellStyle>totalPrice</TableCellStyle>
                            <TableCellStyle>status</TableCellStyle>
                            <TableCellStyle align="center">show details</TableCellStyle>
                        </TableRowStyle>
                    </TableHead>
                    <TableBody>
                        {updatedOrders.map((row) => (
                            <TableRowStyle key={row._id}>
                                <TableCellStyle component="th" scope="row">{row._id}</TableCellStyle>
                                <TableCellStyle component="th" scope="row">{row.totalPrice}</TableCellStyle>
                                <TableCellStyle component="th" scope="row">{row.status}</TableCellStyle>
                                <TableCellStyle component="th" scope="row" align="center">
                                    <CustomLink text="show order details" to={`/orders/${row._id}`} />
                                </TableCellStyle>
                            </TableRowStyle>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
