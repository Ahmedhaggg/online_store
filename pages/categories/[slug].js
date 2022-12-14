import { Grid } from "@mui/material";
import React from "react";
import ProductItem from "../../components/user/Home/ProductItem";
import { wrapper } from "../../store/user";
import { getCategory, getRunningOperationPromises } from "../../store/user/categorySlice"
import SectionHeader from "../../components/user/SectionHeader"
import { env } from "../../next.config"
export default function Category({ category }) {
  return (
    <>
      <SectionHeader text={category.title} />
      <Grid container marginTop={5} key={category._id}>
        {
          category.products.map(product => (
            <Grid item xs={12} md={6} lg={4} key={product._id}>
              <ProductItem product={product} />
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}

export const getStaticPaths = async () => {
  const request = await fetch(env.API_URL + "categories", {
    headers: {
      Origin: env.URI
  }
  });

  let categories = await request.json();
 
  if (categories.success == false) 
    return {
      paths: [],
      fallback: true
    }

  let paths = categories.categories.map(category => {
    return {
      params: { slug: category.title.split("-").join(" ").replace(/\w\S*/g, (text) => text.toLowerCase()), title: category.title }
    }
  });
  
  return{
    paths,
    fallback: true
  }
}

export const getStaticProps = wrapper.getStaticProps(store =>
  async (context) => {
    let { slug } = context.params;
    let { data, isSuccess } = await store.dispatch(getCategory.initiate(slug));
    await Promise.all(getRunningOperationPromises());

    if (!isSuccess)
      return {
        redirect: {
          destination: "/",
          permanent: true
        }
      }
    
    return {
      props: {
        category: data.category
      }
    }
  }
)

