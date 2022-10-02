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
import CustomLinkButton from '../CustomLinkButton';


export default function UserOrderPreview({ rows }) {

    return (
        <TableContainer component={Paper} sx={{ maxWidth: { xs: "340px", sm: "100%" } }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>number</TableCellStyle>
                        <TableCellStyle>total price</TableCellStyle>
                        <TableCellStyle>status</TableCellStyle>
                        <TableCellStyle align="right">show details</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">{index + 1}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.totalPrice}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.status}</TableCellStyle>
                            <TableCellStyle align="right">
                                <CustomLinkButton to={`/admin/orders/${row._id}`} text="show" />
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
