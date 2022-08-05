import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import PostList from "../../components/cards/PostList";
import { server } from "../../config/url.js";
import { authPage } from "../../middlewares/auth";
import CreatePostForm from "../../components/forms/CreatePostForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Dashboard = ({ token }) => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  const [imagesend, setImagesend] = useState('');
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  console.log("token----", token);

  useEffect(() => {
    getuser();
    getUserPosts();

  }, []);

  const getuser = async () => {
    //console.log('token',token);
    if (token) {
      const res = await axios
        .get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          //    console.log('res',res.data);
          setUser(res.data);
          console.log("user------->", user);
        });
    }
  };


  const [content, setContent] = useState("");
  // route
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.post("/api/posts/create-post", { content,image } , {
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


 // get user posts

  const getUserPosts = async () => {

    const {data} = await axios.get("/api/user/user-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user posts ======> ", data);
    setPosts(data);

  }







const handleImage3 = async(e)=>{   // itis workkk
  const file=e.target.files[0];
  const Reader = new FileReader();

  Reader.readAsDataURL(file);
try { 

  Reader.onload = async()=>{
  

   
      console.log('image-------------->',imagesend);    

    //  if (image) {

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
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={  handleImage3}
              uploading={uploading}
              image={image}
            />
                <br />

            <PostList posts={posts} />
          </div>





          <div className="col-md-4">Sidebar</div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  // console.log('token in Server side in Dashboard',token);

  return {
    props: {
      token,
    },
  };
}
