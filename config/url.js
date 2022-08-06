// next-socialapp-bootcamp.vercel.app

const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "next-socialapp-bootcamp.vercel.app";


  // https://next-socialapp-bootcamp-afo73m4t3-maher9911133-gmailcom.vercel.app/socket.io?EIO=4&t=O9rNFnZ&transport=polling


  const devsocket = process.env.NODE_ENV !== "production";

export const serversocket = devsocket
  ? "http://localhost:3000"
  : "next-socialapp-bootcamp.vercel.app";