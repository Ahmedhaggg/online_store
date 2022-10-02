import { Alert, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../../../components/admin/CustomButton";
import Input from "../../../components/admin/Input";
import SectionHeader from "../../../components/admin/SectionHeader";
import { useCreateCategoryMutation } from "../../../store/admin/categories";

export default function Create() {
    let router = useRouter();
    let { control, formState: { errors }, handleSubmit } = useForm();

    let [createCategory, { isSuccess, error }] = useCreateCategoryMutation();

    const submitHandler = (values) => {
        createCategory(values)
    }

    useEffect(() => {
        if (isSuccess)
            router.push("/admin/categories")
    }, [isSuccess])

    return (
        <Grid item xs={12} sm={10}>
            <SectionHeader text="create category" />
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    name="title"
                    rules={{ required: true }}
                    type="text"
                    control={control}
                    error={errors.title}
                />
                {
                    error?.data?.validationErrors?.title ?
                        <Alert severity="error" sx={{ marginBottom: 2 }} >title {error.data.validationErrors.title}</Alert>
                        : null
                }
                <CustomButton text="create category" />
            </form>
        </Grid>
    )
}
