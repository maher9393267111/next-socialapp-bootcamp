import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      
    </Head>
    <Nav />
    <ToastContainer position="top-center" />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;