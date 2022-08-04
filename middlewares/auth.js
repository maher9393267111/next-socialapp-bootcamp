
import jwt from 'jsonwebtoken';
import  cookies from 'next-cookies'
import { useRouter } from 'next/router'
 export  const isAuth = async (req, res, next) => {
    // getting headers from  request to this method
    const { authorization } = req.headers;
    if (authorization) {
      // Bearer xxx => xxx
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Token is not valid' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'Token is not suppiled' });
    }
  };




  // cookies token returned from server to use

  export function authPage(ctx) {
    return new Promise(resolve => {
        const allCookies = cookies(ctx);
        console.log('ALLCOOKIES',allCookies);

        if(allCookies.auth) {

          return resolve({
       
            token: allCookies.auth
        });

        }
        else if (!allCookies.auth) {

          // remove token from cookies
         // res.clearCookie('auth');

          return  ctx.res.writeHead(302, {
             Location: '/login'
         }).end();
    

        }

      
        

       
    });
}