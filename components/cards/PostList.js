
import { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { imageSource } from "../../functions";
import Link from "next/link";
import Post from "../../components/cards/Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <div
          key={post._id}
          >
          <Post
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
          </div>
        ))}
    </>
  );
};

export default PostList;



// import renderHTML from "react-render-html";
// import moment from "moment";
// import { Avatar } from "antd";
// import { UserContext } from "../../context";
// import { useRouter } from "next/router";
// import PostImage from "../images/PostImage";
// import { useContext } from "react";
// import { imageSource } from "../../functions";
// import { HeartOutlined, HeartFilled, CommentOutlined ,EditOutlined ,DeleteOutlined } from "@ant-design/icons";
// // Ryan
// const PostList = ({ posts , DeletePost , handleLike, handleUnlike ,handleComment }) => {

//     const [state] = useContext(UserContext);
//     const router = useRouter();


//   return (


//     <>
//     {posts &&
//       posts.map((post) => (
//         <div key={post._id} className="card mb-5">
//           <div className="card-header">
//             <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "}
//             <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
//               {post.postedBy.name}
//             </span>
//             <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
//               {moment(post.createdAt).fromNow()}
//             </span>
//           </div>
//           <div className="card-body">{renderHTML(post.content)}</div>
//           <div className="card-footer">
//             {post.image && <PostImage url={post.image.url} />}

//             <div className="d-flex pt-2">
//               {post.likes.includes(state.user._id) ? (
//                 <HeartFilled
//                   onClick={() => handleUnlike(post._id)}
//                   className="text-danger pt-2 h5 px-2"
//                 />
//               ) : (
//                 <HeartOutlined
//                   onClick={() => handleLike(post._id)}
//                   className="text-danger pt-2 h5 px-2"
//                 />
//               )}

//               <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
//                 {post.likes.length} likes
//               </div>
//               <CommentOutlined
//                onClick={() => handleComment(post)}
              
//               className="text-danger pt-2 h5 px-2" />
//               <div className="pt-2 pl-3">
//                 {post?.comments?.length} comments
//               </div>

//               {state && state.user && state.user._id === post.postedBy._id && (
//                 <>
//                   <EditOutlined
//                     onClick={() => router.push(`/user/post/${post._id}`)}
//                     className="text-danger pt-2 h5 px-2 mx-auto"
//                   />
//                   <DeleteOutlined
//                     onClick={() => handleDelete(post)}
//                     className="text-danger pt-2 h5 px-2"
//                   />
//                 </>
//               )}
//             </div>

//           </div>

//   {/* 2 comments */}

// <div>
// {post.comments && post.comments.length > 0 && (
//               <ol className="list-group">
//                 {post.comments.slice(0, 2).map((c) => (
//                   <li 
//                   key={c._id}
//                   className="list-group-item d-flex justify-content-between align-items-start">
//                     <div className="ms-2 me-auto">
//                       <div>
//                         <Avatar
//                           size={20}
//                           className="mb-1 mr-3"
//                           src={imageSource(c.postedBy)}
//                         />
//                         &nbsp;{c.postedBy.name}
//                       </div>
//                       <i className="text-muted">{c.text}</i>
//                     </div>
//                     <span className="badge rounded-pill text-muted">
//                       {moment(c.created).fromNow()}
//                     </span>
//                   </li>
//                 ))}
//               </ol>
//             )}
// </div>





//         </div>
//       ))}
//   </>
//   );
// };

// export default PostList;