import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Link } from "@mui/material"

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
// sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
export default function CategoriesSideBar({ categories }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant='h4'>categories</Typography>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {
                        categories.map((category, index) => (
                            <Link href={"categories/" + category.title} style={{ textDecoration: "none" }} key={category._id}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={category.title} sx={{ color: "primary.main" }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </nav>
        </Box>
    );
}
