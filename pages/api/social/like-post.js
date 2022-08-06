
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { likePost  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).post(likePost)
//handler.use(isAuth).put(userFollow)

export default handler;