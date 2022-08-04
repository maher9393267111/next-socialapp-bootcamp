import React from 'react';
import {useState,useEffect,useContext} from 'react';
import { UserContext } from "../../context";
import axios from 'axios';
import {server} from '../../config/url.js'
import { authPage} from '../../middlewares/auth';

const Dashboard = ({token}) => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState({});

console.log('token----',token)


useEffect(() => {

getuser()

}, []);








const getuser = async () => {
//console.log('token',token);
if  ( token) {
    const res = await axios.get('/api/user/profile',{
        headers: {
            Authorization: `Bearer ${token}`
    }}).then(res => {
    //    console.log('res',res.data);
        setUser(res.data)
        console.log('user------->',user);
    })}
    

}



    return (
        <div>
            dashboard
        
        {user?._id}
        </div>
    );
}

export default Dashboard;


export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);
   // console.log('token in Server side in Dashboard',token);

    return {
        props: {
            token
        }
    }
}