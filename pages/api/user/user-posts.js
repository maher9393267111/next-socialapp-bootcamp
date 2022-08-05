// postsByUser
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { postsByUser } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).get(postsByUser)

export default handler;