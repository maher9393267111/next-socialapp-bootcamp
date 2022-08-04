// next-socialapp-bootcamp.vercel.app

const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "next-socialapp-bootcamp.vercel.app";