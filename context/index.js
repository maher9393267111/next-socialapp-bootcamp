import { useState, createContext,useEffect } from "react";
import axios from 'axios'
import Cookies from 'store-js'
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
     user: {},  
      token: ''
   
  });


  useEffect(() => {

    setState(JSON.parse(localStorage.getItem('auth')))

  }, []);






  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };