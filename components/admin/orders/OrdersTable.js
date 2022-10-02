import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLinkButton from '../CustomLinkButton';
import { useSelector } from 'react-redux';


export default function ordersTable({ rows }) {
    let { socket } = useSelector(state => state.auth);
    let [orders, setOrders] = useState([]);

    useEffect(() => {
        socket.on("newOrderNotification", data => {
            setOrders(state => [...state, data.newOrder])
        })

        return () => {
            socket.off("newOrderNotification")
        }
    }, [socket]);

    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>number</TableCellStyle>
                        <TableCellStyle>userName</TableCellStyle>
                        <TableCellStyle>total price</TableCellStyle>
                        <TableCellStyle>status</TableCellStyle>
                        <TableCellStyle align="center">show</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {[...rows, ...orders].map((row, index) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">{index + 1}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.user.userName}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.totalPrice}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.status}</TableCellStyle>
                            <TableCellStyle align="center">
                                <CustomLinkButton to={`/admin/orders/${row._id}`} text="show" />
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
