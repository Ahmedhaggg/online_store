import { UserApiSlice } from "./userApiSlice";

export const authSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (loginData) => ({
                method: "POST",
                url: "auth/login",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
        }),
        register: builder.mutation({
            query: (registerData) => ({
                method: "POST",
                url: "auth/register",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authSlice;
