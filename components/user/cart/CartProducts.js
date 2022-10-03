import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import { env } from "../../../next.config"
import { useSelector } from 'react-redux';


export default function CartProducts() {
    let { items } = useSelector(state => state.cart);
    return (
        <TableContainer component={Paper} sx={{ maxWidth: { xs: "100%", sm: "100%" } }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>image</TableCellStyle>
                        <TableCellStyle>title</TableCellStyle>
                        <TableCellStyle>price</TableCellStyle>
                        <TableCellStyle>quantity</TableCellStyle>
                        <TableCellStyle align="right">totalPrice</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">
                                <img
                                    src={`${env.IMAGE_URL}${row.image}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${row.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={row.title}
                                    crossOrigin="anonymous"
                                    loading="lazy"
                                    width="40px"
                                    height="40px"
                                />
                            </TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.title}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.price}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.quantity}</TableCellStyle>
                            <TableCellStyle align="right">
                                {row.quantity * row.price}
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
