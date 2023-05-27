import { Box } from "@mui/material";
import NextLink from "next/link";
import { Link } from "@mui/material";
import React from "react";
import errorImage from "../assets/404-pages.jpg";
import { useRouter } from "next/router";
export default function NotFound() {
    let router = useRouter()
    let visitor = router.asPath.split("/")[1]
    
    return (
        <Box width="100%" height="100%" sx={{ textDecoration: "none" }}>
            <img src={errorImage.src} width="100%" height="100%" />
            <NextLink href={visitor !== "admin" ? "/" : "/admin"}>
                <Box sx={{ textAlign: "center"}}>
                    <Link href={visitor !== "admin" ? "/" : "/admin"}>Home</Link>
                </Box>
            </NextLink>
        </Box>
    );
}
