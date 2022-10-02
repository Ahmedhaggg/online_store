import { Alert, Grid } from "@mui/material"
import CategoriesSideBar from "../components/user/Home/CategoriesSideBar"
import { getAllCategories, getRunningOperationPromises } from "../store/user/categorySlice"
import { getAllProducts } from "../store/user/productSlice";
import { wrapper } from "../store/user";
import ProductItem from "../components/user/Home/ProductItem";


export default function Home({ categories, products }) {
  
  return (
    categories.length == 0 ? 
      <Alert severity="info">there are no categories</Alert>
      :
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <CategoriesSideBar categories={categories} />
      </Grid>
      <Grid item xs={12} md={9}>
            <Grid container>
              {
                products.map(product => (
                  <Grid item xs={12} sm={6} lg={4} key={product._id}>
                    <ProductItem product={product} />
                  </Grid>
                ))
              }
            </Grid>
      </Grid>
    </Grid>
  )
}


export const getStaticProps = wrapper.getStaticProps(store =>
  async () => {
    let categories = await store.dispatch(getAllCategories.initiate());
    console.log(categories)
    let products = await store.dispatch(getAllProducts.initiate());
    console.log(products)

    await Promise.all(getRunningOperationPromises());
    
    if (!products.isSuccess || !categories.isSuccess)
      return {
        redirect: {
          destination: "/404",
          permanent: true
        }
      }

    return {
      props: {
        categories: categories.data.categories,
        products: products.data.products
      },
      revalidate: 60 * 60
    }
  }
) 