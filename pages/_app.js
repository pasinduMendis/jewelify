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
import Frame from "../components/top";
export default function App({ session,Component, pageProps, ...appProps }) {
  //console.log(appProps.router.pathname) 
  return(
    <SessionProvider session={session}>
      {appProps.router.pathname=='/' ||appProps.router.pathname=='/sign-in'||appProps.router.pathname=='/sign-up'||appProps.router.pathname=='/pricing'||appProps.router.pathname=='/checkout'||appProps.router.pathname=='/thankYou'
      ?
      <Component {...pageProps} />
    :<Frame Component={Component} />}
        
      </SessionProvider>
    )
 
}