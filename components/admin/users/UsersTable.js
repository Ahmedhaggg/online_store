import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLink from '../CustomLink';
import { env } from "../../../next.config"
import UserOrderModel from './UserOrderModel';


export default function UsersTable({ rows }) {

    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>number</TableCellStyle>
                        <TableCellStyle>userName</TableCellStyle>
                        <TableCellStyle>email</TableCellStyle>
                        <TableCellStyle align="center">show</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">{index + 1}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.userName}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.email}</TableCellStyle>
                            <TableCellStyle align="center">
                                <UserOrderModel userId={row._id} />
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
