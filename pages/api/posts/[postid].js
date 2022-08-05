import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { postById  } from '../../../controllers/post'


const handler = nc({  });

dbConnect();

handler.get(postById )

export default handler;