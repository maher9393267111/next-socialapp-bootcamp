
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { unlikePost } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).post(unlikePost )


export default handler;