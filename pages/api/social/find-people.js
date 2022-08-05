// postsByUser
import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { findPeople , userFollow  } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).get(findPeople)
handler.use(isAuth).put(userFollow)

export default handler;