import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { login } from '../../../controllers/auth'

const handler = nc({  });

dbConnect();

handler.post(login)

export default handler;