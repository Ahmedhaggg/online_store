import React, { useEffect } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { Controller, useForm } from "react-hook-form"
import SectionHeader from "../../components/admin/SectionHeader";
import CustomButton from "../../components/admin/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/admin/adminAuth"
import PageLoading from "../../components/PageLoading";
export default function Login() {
    let { control, handleSubmit, formState: { errors } } = useForm();
    let router = useRouter();
    let { token, loginError } = useSelector(state => state.auth);
    let dispatch = useDispatch();

    let loginSubmit = (loginData) => {
        dispatch(login(loginData))
    }

    useEffect(() => {
        if (token)
            router.push("/admin/")

    }, [token])


    return (
        token ? <PageLoading /> :
            <Grid container justifyContent="center" height="100vh" alignItems="center" >
                <Grid item xl={6} xs={11} md={6} >
                    <SectionHeader text="login" />
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    label="email"
                                    error={Boolean(errors.email)}
                                    sx={{ marginBottom: 2 }}
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 8,
                            }}
                            render={({ field }) => (
                                <TextField
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    label="Password"
                                    sx={{ marginBottom: 2 }}
                                    error={Boolean(errors.password)}
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                        {
                            loginError && <Alert severity="error" sx={{ marginBottom: 2 }}>{loginError}</Alert>
                        }
                        <CustomButton text="login" />
                    </form>
                </Grid>
            </Grid>

    )
}
