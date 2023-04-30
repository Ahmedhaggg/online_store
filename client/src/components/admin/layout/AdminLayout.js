import React, { useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { styled } from '@mui/material/styles';
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/router";

const Content = styled("div")(({ theme }) => ({
    display: "flex"
}));


export default function AdminLayout({ children }) {
    let [toggledSidebar, setToggledSidebar] = useState(false);
    let toggleSidebar = () => setToggledSidebar(!toggledSidebar)
    
    return <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Content sx={{ marginTop: { xs: "56px", sm: "64px" } }}>
            <SideBar isOpened={toggledSidebar} toggleSidebar={toggleSidebar} />
            <Container>
                <Grid container justifyContent="center" >
                    {children}
                </Grid>
            </Container>
        </Content>
    </div>;
}
