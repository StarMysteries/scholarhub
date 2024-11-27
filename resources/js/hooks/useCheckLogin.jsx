import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('user_role');

        if(userRole){
            // Redirect if the user is already logged in
            if (userRole === 'Provider') {
                navigate('/donor');
            } else if (userRole === 'Student') {
                navigate('/');
            } else if (userRole === 'Admin') {
                navigate('/admin');
            }
        }
        
    });
}
