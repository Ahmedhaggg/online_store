import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Landing from "../Home/Landing";
import Footer from './footer'

export default function Layout({ children }) {
    const [isSSR, setIsSSR] = useState(true);
    let router = useRouter();

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        !isSSR && <>
            <Navbar />
            {
                router.asPath == "/" ? <Landing /> : null
            }
            <Container sx={{ marginTop: "100px", marginBottom: 5 }}>
                {children}
            </Container>
            {
                router.asPath == "/" ? <Footer /> : null
            }
        </>
    );
}
