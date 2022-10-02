import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import AppsIcon from '@mui/icons-material/Apps';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClearIcon from '@mui/icons-material/Clear';


let sidebarItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />
    },
    {
        text: "categories",
        icon: <CategoryIcon />
    },
    {
        text: "products",
        icon: <DevicesIcon />
    },
    {
        text: "users",
        icon: <PeopleIcon />
    },
    {
        text: "orders",
        icon: <ShoppingCartCheckoutIcon />
    }
]

export default function SideBar({ isOpened, toggleSidebar }) {
    return (
        <Box sx={{
            position: "fixed",
            zIndex: 2,
            top: "64px",
            backgroundColor: "rgb(0, 0, 0, 38%)",
            width: "100%",
            height: "100%",
            display: { xs: "none", sm: "block" },
            left: isOpened ? "0px" : "-100%",
            transition: "left 0.2s",

        }}>
            <Button
                sx={{
                    position: "absolute",
                    top: "0",
                    right: "10px"
                }}

                onClick={toggleSidebar}
            >
                <ClearIcon color="error" sx={{ fontSize: "50px" }} />
            </Button>
            <Box sx={{
                position: "absolute",
                // top: "64px",
                left: isOpened ? "0px" : "-300px",
                width: "250px",
                display: { xs: "none", sm: "block" },
                boxShadow: 6,
                zIndex: 2,
                height: "calc(100vh - 64px)",
                backgroundColor: "#eee",
                transition: "left 0.5s"
            }}>
                <List sx={{ paddingTop: 3 }}>
                    {sidebarItems.map((item, index) => (
                        <Link href={`/admin/${index === 0 ? "" : item.text}`} key={index}>
                            <ListItem disablePadding >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </Box>

    )
}