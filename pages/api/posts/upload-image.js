// uploadImage 
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { uploadImage  } from '../../../controllers/post'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();


handler.post(uploadImage)

export default handler;