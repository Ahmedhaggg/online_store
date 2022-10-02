import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../../store/user/user"
import Link from 'next/link';
import { useRouter } from "next/router"
import Cart from './navbarItems/Cart';
import Notification from './navbarItems/Notification';
import OrderIcon from "@mui/icons-material/AccountCircle"
import { useGetAllNotificationsQuery } from '../../../store/user/notificationSlice';
import { addNewNotification, addNotifications, removeAllNotifications } from '../../../store/user/notifications';
import { useDeleteAllNotificationsMutation } from '../../../store/user/notificationSlice';
export default function Navbar() {
    let { token, socket } = useSelector(state => state.user)
    let { data, isSuccess } = useGetAllNotificationsQuery(null, { skip: token ? false : true });
    let dispatch = useDispatch()
    let router = useRouter();
    let [deleteAllNotifications, deleteAllNotificationsResult] = useDeleteAllNotificationsMutation()
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    let logoutAction = () => {
        deleteAllNotifications();
        dispatch(removeAllNotifications());
        dispatch(logout());
        router.push("/login")
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';


    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link href="/orders">
                <MenuItem>
                    <IconButton size="large" color="inherit">
                        <OrderIcon />
                    </IconButton>
                    <p>orders</p>
                </MenuItem>
            </Link>

            <Link href="/cart">
                <MenuItem>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Cart />
                    </IconButton>
                    <p>cart</p>
                </MenuItem>
            </Link>

            <Link href="/notifications">
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show new notifications"
                        color="inherit"
                    >
                        <Notification />
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
            </Link>
            <MenuItem onClick={logoutAction}>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>logout</p>
            </MenuItem>
        </Menu>
    );

    useEffect(() => {
        if (socket) {
            if (isSuccess)
                dispatch(addNotifications({ notifications: data.notifications }));

            socket.on("ordersNotifications", data => {
                dispatch(addNewNotification(data.newNotification))
            });

            return () => {
                socket.off("ordersNotifications");
            }
        }
    }, []);
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{ cursor: "pointer" }}
                        >
                            Ecommerce
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        token ? (
                            <>
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Link href="/orders">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <OrderIcon />
                                        </IconButton>
                                    </Link>
                                    <Link href="/notifications">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <Notification />
                                        </IconButton>
                                    </Link>
                                    <Link href="/cart">
                                        <IconButton
                                            size="large"
                                            aria-label="show 17 new notifications"
                                            color="inherit"
                                        >
                                            <Cart />
                                        </IconButton>
                                    </Link>
                                    <Button color="inherit" sx={{ marginLeft: 2 }} onClick={logoutAction}>logout</Button>
                                </Box>
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Box>
                            </>
                        )
                            : (
                                <>
                                    <Link href="/cart">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <Cart />
                                        </IconButton>
                                    </Link>
                                    <Link href="/login">
                                        <Button href="/login" variant="inherit">login</Button>
                                    </Link>
                                </>
                            )
                    }
                </Toolbar>
            </AppBar>

            {token && renderMobileMenu}
        </Box>
    );
}
