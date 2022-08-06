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
import People from "../../components/cards/People";
import { Modal } from "antd";
import CommentForm from "../../components/forms/CommentForm";

const Dashboard = ({ token }) => {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  const [imagesend, setImagesend] = useState('');
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
const [people, setPeople] = useState([]);
  //console.log("token----", token);

  // comments
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});



  useEffect(() => {
    getuser();
    //getUserPosts();
    findPeople();
    newsFeed();

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
        //  console.log("user------->", user);
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

  // const getUserPosts = async () => {

  //   const {data} = await axios.get("/api/user/user-posts", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   console.log("nwessss posts ======> ", data);
  //   setPosts(data);

  // }







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









const DeletePost = async(id) => {
//  e.preventDefault();
   console.log("post DYnamiccccc => ", id);
  try {
    const { data } = await axios.delete(`/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Delete post response => ", data);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Post deleted");
   
    }
  } catch (err) {
    console.log(err);
  }
};



const findPeople = async () => {
  // console.log("add this user to following list ", user);
  try {
    const { data } = await axios.get("/api/social/find-people",{
     headers: {

      Authorization: `Bearer ${token}`,
     },
    });
    console.log("handle onother people to follow response => ", data);
    setPeople(data);
  } catch (err) {
    console.log(err.message);
  }
};


const handleFollow = async (user) => {
  // console.log("add this user to following list ", user);
  try {
    const { data } = await axios.put("/api/social/find-people", { _id: user._id },{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("handle follow response => ", data);

    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    // update context
    setState({ ...state, user: data });
    // update people state
    let filtered = people.filter((p) => p._id !== user._id);
    setPeople(filtered);
    // rerender the posts in newsfeed
    newsFeed();
    toast.success(`Following ${user.name}`);


  } catch (err) {
    console.log(err);
    toast.error( err)
  }
};


const newsFeed = async () => {
  try {
    const { data } = await axios.get("/api/social/news-feed",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
     console.log("user posts => ", data);
    setPosts(data);
  } catch (err) {
    console.log(err);
  }


};



const handleLike = async (_id) => {
  // console.log("like this post => ", _id);
  try {
    const { data } = await axios.post("/api/social/like-post", { _id }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("liked", data);
    newsFeed();
  } catch (err) {
    console.log(err);
  }
};

const handleUnlike = async (_id) => {
  // console.log("unlike this post => ", _id);
  try {
    const { data } = await axios.post("/api/social/unlike-post", { _id },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("unliked", data);
    newsFeed();
  } catch (err) {
    console.log(err);
  }
};



const handleComment = (post) => {
  setCurrentPost(post);
  setVisible(true);
};

const addComment = async (e) => {
  e.preventDefault();
  // console.log("add comment to this post id", currentPost._id);
  // console.log("save comment to db", comment);
  try {
    const { data } = await axios.post("/api/social/comment", {
      postId: currentPost._id,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    console.log("add comment", data);
    setComment("");
    setVisible(false);
    newsFeed();
  } catch (err) {
    console.log(err);
  }
};

const removeComment = async () => {
  //
};












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

            <PostList posts={posts}      DeletePost={DeletePost}
            handleUnlike ={handleUnlike}
            handleLike={handleLike}
            handleComment={handleComment}
            
            />
          </div>



          <div className="col-md-4">
            <People people={people} handleFollow={handleFollow} />
          </div>

        </div>


        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>




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
