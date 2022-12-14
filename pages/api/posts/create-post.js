import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { createPost , totalPosts  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).post(createPost)
handler.get(totalPosts)

export default handler;