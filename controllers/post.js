import {Post } from "../models/post";
import cloudinary from "cloudinary";

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
     console.log('posts',posts)
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
