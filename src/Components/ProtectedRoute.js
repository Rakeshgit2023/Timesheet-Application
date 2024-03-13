import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    console.log(props.name)
    const nav = useNavigate();
    useEffect(() => {
        let data = sessionStorage.getItem('msal.account.keys')
         data === null && nav('/')
    }, [])
    return (
        <div>
            <props.name/>
        </div>
    )
}
export default ProtectedRoute;