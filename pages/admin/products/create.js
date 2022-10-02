import { Alert, Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../../components/admin/CustomButton";
import FileUpload from "../../../components/admin/FileUpload";
import Input from "../../../components/admin/Input";
import SectionHeader from "../../../components/admin/SectionHeader";
import { useCreateProductMutation } from "../../../store/admin/productSlice";
import { wrapper } from "../../../store/admin";
import { getAllCategories, getRunningOperationPromises, useGetAllCategoriesQuery } from "../../../store/admin/categories";
import SelectInput from "../../../components/admin/SelectInput";
import PageLoading from "../../../components/PageLoading";

export default function CreateProduct({ categories }) {
    let router = useRouter();
    let { control, formState: { errors }, handleSubmit } = useForm();
    let getAllCategoriesResult = useGetAllCategoriesQuery();
    let productImageRef = useRef();
    let [createProduct, { isSuccess, error }] = useCreateProductMutation();

    const submitHandler = (values) => {
        createProduct({
            image: productImageRef.current.getImage(),
            ...values
        })
    }
    useEffect(() => {
        if (!getAllCategoriesResult.isLoading && !getAllCategoriesResult.isSuccess)
            router.push("/404")
    }, [getAllCategoriesResult])

    useEffect(() => {
        console.log("errro", error)
        if (isSuccess)
            router.push("/admin/products")
    }, [isSuccess])

    return (
        getAllCategoriesResult.isSuccess ?
            <Grid item xs={12} sm={10}>
            <SectionHeader text="create category" />
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    control={control}
                    type="text"
                    name="title"
                    error={errors.title}
                    rules={{ required: true }}
                />
                <Input
                    control={control}
                    type="text"
                    name="price"
                    error={errors.price}
                    rules={{ required: true }}
                />
                <SelectInput
                    defaultValue={getAllCategoriesResult.data.categories[0]._id}
                    name="categoryId"
                    control={control}
                    rules={{ required: true }}
                    error={errors.categoryId}
                    items={getAllCategoriesResult.data.categories}
                />
                <FileUpload _ref={productImageRef} />

                <CustomButton text="create product" />
            </form>
        </Grid> : <PageLoading />
    )
}

// export const getStaticProps = wrapper.getStaticProps((store) =>
//     async () => {
//         let { data } = await store.dispatch(getAllCategories.initiate());
        
//         await Promise.all(getRunningOperationPromises());

//         return {
//             props: {
//                 categories: data.categories
//             }
//         }
//     }
// )