import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import AdminLayout from "../../../components/admin/layout/AdminLayout";
import PageLoading from "../../../components/PageLoading";
import { env } from "../../../next.config";
import { removeSocket, addSocket } from "../../../store/admin/adminAuth";
import cookies from "../../cookies"
import { adminTokenKey } from "../../cookies/cookies_keys";

export default function AdminGuard({ children }) {
    let [isLoading, setIsLoading] = useState(true);
    let [isAdmin, setIsAdmin] = useState(false);

    let router = useRouter();
    let dispatch = useDispatch();

    useEffect(() => {
        if (!cookies.get(adminTokenKey)) {
            router.push("/admin/login")
        } else {
            // socket connect
            const socketIo = io(env.URL, { auth: { token: cookies.get(adminTokenKey) } });

            // dispatch socket
            dispatch(addSocket({ socket: socketIo }));

            // admon connect
            socketIo.emit("adminConnect")

            // load content
            setIsAdmin(true)
            setIsLoading(false)

            function cleanup() {
                socketIo.emit("adminDisconnect");
                socketIo.disconnect()
                dispatch(removeSocket());
            }
            return cleanup;
        }

    }, [])

    if (isLoading)
        return <PageLoading />;

    if (isAdmin)
        return (
            <AdminLayout>{children}</AdminLayout>
        )
}
