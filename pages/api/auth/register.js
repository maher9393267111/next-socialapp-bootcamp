import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import { register } from '../../../controllers/auth'

const handler = nc({  });

dbConnect();

handler.post( register)

export default handler;