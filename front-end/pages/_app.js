import '../styles/globals.css'
import Layout from '../components/ui/layout/layout'
import AuthProvider from '../context/authContext'
import LikesProvider from '../context/likesContext'

function MyApp({ Component, pageProps }) {
  return <AuthProvider> <LikesProvider> <Layout><Component {...pageProps} /> </Layout> </LikesProvider> </AuthProvider>
}

export default MyApp
