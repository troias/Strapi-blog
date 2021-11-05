import '../styles/globals.css'
import Layout from '../components/ui/layout/layout'
import AuthProvider from '../context/authContext'

function MyApp({ Component, pageProps }) {
  return <AuthProvider><Layout><Component {...pageProps} /> </Layout>  </AuthProvider>
}

export default MyApp
