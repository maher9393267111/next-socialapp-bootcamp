import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import '../styles/globals.css'
import React, {useState, useEffect} from 'react';
import { UserProvider } from "../context";
function MyApp({ Component, pageProps }) {


  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);  


  return (
    <UserProvider>
    <Head>
      
    </Head>
    <Nav />
    <ToastContainer position="top-center" />
    <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;