import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(requiredRole = null) {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('user_role');

        console.log('userRole:', userRole);
        console.log('requiredRole:', requiredRole);

        // Redirect to login if no user role is found
        if (!userRole) {
            navigate('/login');
        } else if (requiredRole && userRole !== requiredRole) {
            // Redirect if the user does not have the required role
            navigate('/unauthorized');
        }
    }, [navigate, requiredRole]);
}
