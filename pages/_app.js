import { useRouter } from "next/router"
import { Provider } from "react-redux"
import '../styles/globals.css'
import UserStore from "../store/user/index"
import AdminStore from "../store/admin/index"
import AdminGuardProvider from "../services/guards/admin/AdminGuardProvider";
import { ThemeProvider } from '@mui/material/styles';
import AdminTheme from "../thems/AdminTheme"
import { wrapper } from "../store/admin/index"
import AdminProvider from "../components/pagesProviders/AdminProvider"
import UserProvider from "../components/pagesProviders/UserProvider"


import PageLoading from "../components/PageLoading"
function MyApp({ Component, pageProps }) {
  let router = useRouter()
  let person = router.asPath.split("/")[1]

  // let reduxx = wrapper.withRedux()
  if (person === "admin")
    return (
      <AdminProvider>
        <Component {...pageProps} />
      </AdminProvider>
    )

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
export default MyApp;

// export default MyApp
