import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import '../styles/responsive.css'
import '../styles/bootstrap.min.css'
// import '../styles/fontawesome.min.css'
import '../styles/font-awesome.min.css'
import '../styles/style.css'
import '../public/css/normalize.css'
import '../public/css/webflow.css'
import '../public/css/jewelify.webflow.css'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}