import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/router";
import {RollbackOutlined} from "@ant-design/icons"
import { authPage } from "../../middlewares/auth";

import { toast } from "react-toastify";
import Post from "../../components/cards/post";
const PostComments = ({token}) => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${_id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };


  const removeComment = async (postId, comment) => {
     console.log(postId, comment);
    // let answer = window.confirm("Are you sure?");
    // if (!answer) return;
    try {
      const { data } = await axios.put("/api/social/comment", {
        postId,
        comment,
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
      );
      console.log("comment removed", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };




  return (

    <div className="container-fluid">
    <div className="row py-5 text-light bg-default-image">
      <div className="col text-center">
        <h1>MERNCAMP</h1>
      </div>
    </div>

    <div className="container col-md-8 offset-md-2 pt-5">
      <Post post={post} commentsCount={100} removeComment={removeComment} />
    </div>

    <Link href="/user/dashboard">
      <a className="d-flex justify-content-center p-5">
        <RollbackOutlined />
      </a>
    </Link>
  </div>

  );
};

export default PostComments;




export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
    // console.log('token in Server side in Dashboard',token);
  
    return {
      props: {
        token,
      },
    };
  }