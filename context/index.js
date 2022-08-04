import { useState, createContext,useEffect } from "react";
import axios from 'axios'
import Cookies from 'js-cookie';
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
     user: {},  
      token: ''
   
  });


  useEffect(() => {

    setState(JSON.parse(localStorage.getItem('auth')))
    // remove cookie
   // Cookies.remove('auth')

  }, []);


  const logout = () => {
    console.log('logout');
    localStorage.removeItem('auth')
    setState({})
    Cookies.remove('auth');
   
  }


  useEffect(() => {

    if( state?.token === undefined || state?.token === null) {
      console.log('token is undefined',state?.token)
      // remove cookie from cookies js-cookie
    
      Cookies.remove('auth');
      localStorage.removeItem('auth')
    }

  }, []);





  return (
    <UserContext.Provider value={[state, setState,logout]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };