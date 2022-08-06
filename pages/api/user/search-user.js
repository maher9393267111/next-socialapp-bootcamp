import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { searchUser } from '../../../controllers/auth'
import {isAuth } from '../../../middlewares/auth'

const handler = nc({  });

dbConnect();


handler.get(searchUser)





export default handler;