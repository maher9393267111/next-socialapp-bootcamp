
import {User} from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  console.log('req body', req.body);
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be 6 characters long");
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email is taken");
  // hash password
  const hashedPassword = await hashPassword(password);

const username  =nanoid(6)
console.log('username', username);

  const user = new User({ name, email, password: hashedPassword, secret ,  username});
  console.log('user da=ta', user);
  try {
    await user.save();
    console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send({
    message :err.message,

    });
  }
};



// Login new user



export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      // expired aftr 1min
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


// curret user data fetch
export const Profile = async (req, res) => {

  const user = await User.findById(req.user._id).select("-password -secret");
  res.json(user);


}




export const forgotPassword = async (req, res, next) => {
  console.log('FOOOOORGETT',req.body);
  const { email, newPassword, secret } = req.body;
  console.log('req body', req.body);
  // validation
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: "New password is required and should be min 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  let user = await User.findOne({ email, secret });
   console.log("EXIST ----->", user);
  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }
  // return res.status(400).send("We cant verify you with those details");

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats. Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
}




// updata user profile




export const profileUpdate = async (req, res) => {
  try {
    // console.log("profile update req.body", req.body);
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: "Password is required and should be min 6 characters long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }


    if (req.body.image) {
      data.image = req.body.image;
    }



    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
    // console.log('udpated user', user)
    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
  }
};



export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
  //  console.log('user', user);
    // user.following
    let following = user.following;
    following.push(user._id);
    const people = await User.find({ _id: { $nin: following } }).limit(10);
    res.json(people);
  } catch (err) {
    console.log(err.message);
  }
};



export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};