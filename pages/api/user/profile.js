import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { Profile } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();

handler.use(isAuth).get(Profile)

export default handler;