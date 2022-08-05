import React from 'react';
import axios from 'axios'
import { server } from '../../../config/url';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { authPage } from "../../../middlewares/auth"
import PostForm from "../../../components/forms/CreatePostForm";
const PostId = ({id ,token}) => {
const [post,setPost] = useState({})
const [uploading,setUploading] = useState(false)
const [image,setImage] = useState('')
const [loading,setLoading] = useState(false)
const [content,setContent] = useState('')
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




const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.put(`/api/posts/${id}`, { content,image } , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post created");
        setContent("");
        setImage("");
        getUserPosts();
      }
    } catch (err) {
      console.log(err);
    }
  };





const handleImage3 = async(e)=>{   // itis workkk
    const file=e.target.files[0];
    const Reader = new FileReader();
  
    Reader.readAsDataURL(file);
  try { 
  
    Reader.onload = async()=>{
    
  
     
         
  
     
  
          const { data } = await axios.post("/api/posts/upload-image", { imageis: Reader.result }, );
           console.log("uploaded image => ", data);
          setImage({
            url: data.url,
            public_id: data.public_id,
          });
       
        
        
        
  
  
      // }
    }
  } catch (err) {
  
    console.log(err.message);
  }
  }
  
  







    
    return (
        <div>
             <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage3}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
        </div>
    );
}

export default PostId;


export async function getServerSideProps(context) {
    const { id } = context.query;
    const { token } = await authPage(context);
  
    if (!id) {
      return {
        notFound: true
      };
    }
  
    return {
      props: { id ,token }
    };
  }


