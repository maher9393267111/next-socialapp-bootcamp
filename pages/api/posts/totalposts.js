import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import {  totalPosts  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'


const handler = nc({  });

dbConnect();

handler.use(isAuth).get(totalPosts)

export default handler;