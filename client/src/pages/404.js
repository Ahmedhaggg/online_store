import { Box } from "@mui/material";
import NextLink from "next/link";
import { Link } from "@mui/material";
import React from "react";
import errorImage from "../assets/404-pages.jpg";

export default function NotFound() {

    return (
        <Box width="100%" height="100%" sx={{ textDecoration: "none" }}>
            <img src={errorImage.src} width="100%" height="100%" />
            <NextLink href={page !== "admin" ? "/" : "/admin"}>
                <Box sx={{ textAlign: "center"}}>
                    <Link href={page !== "admin" ? "/" : "/admin"}>Home</Link>
                </Box>
            </NextLink>
        </Box>
    );
}
