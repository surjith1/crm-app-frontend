import React from 'react';
import {Route,useHistory} from 'react-router-dom';

export default function PrivateRoute({path,component:Component}){

    let history = useHistory();

    const redirectToLogin=()=>{
        console.log('Inside redirect');
        setTimeout(()=>{
            history.push('/login');
            console.log('Redirect exceuted');
        },3000)
    }

    const authToken= localStorage.getItem('auth-token');
    return <Route path={path} render={()=>{
        return (authToken.length>=16) ? <Component/> : <p>Please login to continue , redirecting you to login in 3 seconds {redirectToLogin()}</p>
    }}
    />

    
}