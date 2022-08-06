import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useContext } from "react";
import { UserContext } from "../context";
import {toast} from "react-toastify";
import { server } from "../config/url.js";

import dynamic from "next/dynamic";
const  ParallaxBG = dynamic(() => import("../components/cards/ParallaxBG"), {ssr: false});
import axios from "axios";
//import PostPublic from "../components/cards/PostPublic";
const  PostPublic= dynamic(() => import("../components/cards/PostPublic"), {ssr: false});
import Link from 'next/link';
import { useEffect, useState } from 'react';




export default function Home({posts}) {

  const [state, setState] = useContext(UserContext);






  return (
    <>
    
      <ParallaxBG url="/images/default.jpg" />

      <div className="container">
        <div className="row pt-5">
          {posts.map((post) => (
            <div className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic key={post._id} post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}



export async function getServerSideProps() {
  const { data } = await axios.get(`${server}/api/posts/all-posts`);
  // console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}