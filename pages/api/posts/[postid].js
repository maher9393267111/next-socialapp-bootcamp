import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { postById ,isOwner ,UpdatePost  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.get(postById )

handler.use(isAuth).use(isOwner).put(UpdatePost)





export default handler;