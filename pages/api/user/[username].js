import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { getUser  } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.get(getUser)






export default handler;