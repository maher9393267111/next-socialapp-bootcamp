import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { forgotPassword  } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler
// .use(isAuth)
.post(forgotPassword )

export default handler;