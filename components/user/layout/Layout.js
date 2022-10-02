import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        !isSSR && <>
            <Navbar />
            <Container sx={{ marginTop: "64px", marginBottom: 5 }}>
                {children}
            </Container>
        </>
    );
}
