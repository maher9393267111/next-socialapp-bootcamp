import React from 'react';
import axios from 'axios'
import { server } from '../../../config/url';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
const PostId = ({id}) => {
const [post,setPost] = useState({})


console.log(id);

useEffect(() => {

fetchPost();



}, [])



const fetchPost = async () => {
console.log('id------->',id)
if (id) {
  const { data } = await axios.get(`${server}/api/posts/${id}`);
  console.log('response ==>',data);
    setPost(data);
}
}


    
    return (
        <div>
            <h1>{id}</h1>
            
            <h1>{post?.postedBy?.name}</h1>
        </div>
    );
}

export default PostId;


export async function getServerSideProps(context) {
    const { id } = context.query;

  
    if (!id) {
      return {
        notFound: true
      };
    }
  
    return {
      props: { id }
    };
  }


