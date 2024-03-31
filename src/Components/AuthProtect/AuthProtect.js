import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProtect({ children }) {
    let nave = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            nave("/home")
        }
    }, [])
    return children
}
