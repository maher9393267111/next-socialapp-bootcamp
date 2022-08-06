// posts

import nc from 'next-connect'
import dbConnect from '../../../config/dbconnect'
import { posts } from '../../../controllers/post'


const handler = nc({  });

dbConnect();


handler.get(posts)

export default handler;