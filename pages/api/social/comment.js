import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { removeComment ,addComment  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).post(addComment )
handler.use(isAuth).put(removeComment)

export default handler;