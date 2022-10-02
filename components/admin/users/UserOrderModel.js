import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useGetUserQuery } from "../../../store/admin/userSlice"
import { CircularProgress } from '@mui/material';
import UserOrderPreview from './UserOrderPreview';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflowY: "scroll",
    height: "200px",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UserOrderModel({ userId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let { data, isSuccess, isLoading } = useGetUserQuery(userId);
    console.log(data);
    return (
        <div>
            <Button onClick={handleOpen}>show orders</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {
                        isLoading ?
                            <CircularProgress />
                            :
                            isSuccess ?
                                <>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                                        orders
                                    </Typography>
                                    <UserOrderPreview rows={data.user.orders} />
                                </>
                                :
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    something went wrong
                                </Typography>
                    }
                </Box>
            </Modal>
        </div>
    );
}
