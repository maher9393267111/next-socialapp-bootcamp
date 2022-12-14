import {Post } from "../models/post";
import cloudinary from "cloudinary";
import {User} from "../models/user";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});







export const createPost = async (req, res) => {
     console.log("post => ", req.body);
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }


  try {

    console.log("req Body", req.body);




    const post = new Post({ content, image, postedBy: req.user._id });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


export const uploadImage = async (req, res) => {
   console.log("req files => ", req.body);
  try {
    const result = await cloudinary.uploader.upload(req.body.imageis);
    console.log("uploaded image url => ", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};




export const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    // console.log('posts',posts)
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};


// postbyid

export const postById = async (req, res) => {

  const { postid } = req.query;
  console.log("postid => ", postid);

  try {
    const post = await Post.findById(postid)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  }
  catch (err) {
    res.sendStatus(400).json({
      error: err.message,
    });
  }



}


// can edit post if user is owner of post

export  const isOwner = async (req, res ,next) => {


  try {
    const { postid } = req.query;
   // console.log("postid in Owner middllware => ", postid);
const post = await Post.findById(postid).populate("postedBy", "_id name image");
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
     
    //  console.log('post user _id => ', post.postedBy._id , 'req user _id => ', req.user._id);
    //  console.log("user is not owner of post");
      return res.status(403).json({
        error: "User is not owner of post",
      });
    }
    else {
      console.log('he is owner of post    ??? ???   ??? ???')
      next();
    }


  }
  catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }




}



// update post

export const UpdatePost = async (req, res) => {
  // console.log("post update controller => ", req.body);
  try {
    const { postid } = req.query;

// delete old image if new image is uploaded and old image is not deleted from cloudinary
    if (req.body.image) {
      const postbefore = await Post.findById(postid);
      if (postbefore.image.public_id) {
        await cloudinary.v2.uploader.destroy(postbefore.image.public_id).then(
          (result) => {
            console.log("deleted old image from cloudinary");
          }
        ).catch((err) => {
          console.log(err);
        }
        );

      }
    }




    
    const post = await Post.findByIdAndUpdate(postid, req.body, {
      new: true,
    });
    console.log("post update controller => ", post);
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

// delete post

export const deletePost = async (req, res) => {

  const { postid } = req.query;

  try {

    // find post by id delete image from cloudinary
    const post = await Post.findById(postid);
    if (post.image.public_id) {


      await cloudinary.v2.uploader.destroy(post.image.public_id).then(
        (result) => {
          console.log("deleted old image from cloudinary");
        }
      ).catch((err) => {
        console.log(err);
      }
      );

    }

    // then delete post
    await Post.findByIdAndDelete(postid);
    res.json({
      message: "Post deleted successfully",
    });





  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });

  }



}

// my posts and following users posts

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let following = user.following;
    following.push(req.user._id);
    // pagination
    // `/api/social/news-feed?page=${page}`
    const currentPage = req.query.page || 1;
    console.log("currentPage => ???????????? ", currentPage);
    const perPage = 3;

    const posts = await Post.find({ postedBy: { $in: following } })
      .skip((currentPage - 1) * perPage)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(perPage);

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};




export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};






export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    ) .populate("postedBy", "_id name image").populate('comments.postedBy', '_id name image')
   
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};






export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const totalPosts = async (req, res) => {
  try {

// find number of posts

const total = await Post.find({ postedBy: req.user._id }).countDocuments();

 const  hello = 'my name is maher'
    console.log("total posts Server here => ", total);
    res.json(total , hello);
  } catch (err) {
    console.log(err);
  }
};



export const posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(12);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};