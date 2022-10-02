import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageLoading from "../../../components/PageLoading";
import AdminGuard from "./AdminGuard";

export default function AdminGuardProvider({ children }) {
    let router = useRouter();
    let notProtectedPages = { login: "login", 404: "404" }
    let page = router.asPath.split("/").pop();
    let [ISSSR, setISSSR] = useState(false)
    let [showChild, setShowChild] = useState(false)
    
    useEffect(() => {
        setISSSR(true)
    }, []);

    useEffect(() => {
        setShowChild(true);
    }, []);
    
    if (!showChild) {
        return null;
    }
    
    if (typeof window === 'undefined') 
        return <></>;

    if (notProtectedPages[page] && !ISSSR)
        return <PageLoading />

    if (notProtectedPages[page] && ISSSR)
        return <div>{children}</div>
        
    return (
        <AdminGuard>{children}</AdminGuard>
    )

}
