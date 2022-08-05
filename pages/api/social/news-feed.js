
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { newsFeed } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).get(newsFeed)
//handler.use(isAuth).put(userFollow)

export default handler;