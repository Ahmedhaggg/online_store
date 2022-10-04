import { wrapper } from "../../store/user"
// import AdminGuardProvider from "../../services/guards/admin/AdminGuardProvider"
import { ThemeProvider } from '@mui/material/styles';
import UserTheme from "../../thems/userTheme";
import Layout from "../user/layout/Layout";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSocket } from "../../store/user/user";
import { io } from "socket.io-client";
import { env } from "../../next.config";

function UserProvider({ children }) {
    let router = useRouter();
    let notProtectedPages = { login: "login", register: "register" }
    let page = router.asPath.split("/").pop();
    let dispatch = useDispatch();
    let {token, userId} = useSelector(state => state.user);
    

    useEffect(() => {
        if (token) {
            const socketIo = io(env.SERVER_URL, { auth: { token: token } });
            dispatch(addSocket({ socket: socketIo }));

            socketIo.emit("newUser", { userId: userId })

            function cleanup() {
                socketIo.emit("disconnectUser", { userId: userId });
                socketIo.disconnect();
            }

            return cleanup;
        }
    }, [token])



    return (
        <ThemeProvider theme={UserTheme}>
            {notProtectedPages[page] ? <div>{children}</div> : <Layout>{children}</Layout>}
        </ThemeProvider>
    )
}

export default wrapper.withRedux(UserProvider)