import React from 'react'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function Protect({ children }) {
    let token = localStorage.getItem('token');

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
    } catch (error) {
        console.log('errr');
        return <Navigate to={"/Signin"} />;
    }

    if (token) return children;
    return <Navigate to={"/Signin"} />;


}
