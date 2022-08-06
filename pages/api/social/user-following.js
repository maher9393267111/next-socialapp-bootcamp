// userFollowing

import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { userFollowing } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).get(userFollowing)
//handler.use(isAuth).put(userFollow)

export default handler;