import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('user_role');

        if (userRole) {
            // Redirect based on user role
            if (userRole === 'Provider') {
                navigate('/donor', { replace: true });
            } else if (userRole === 'Student') {
                navigate('/', { replace: true });
            } else if (userRole === 'Admin') {
                navigate('/admin', { replace: true });
            }
        }
    }, [navigate]);
}