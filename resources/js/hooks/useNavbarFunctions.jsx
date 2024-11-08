import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function useNavbarFunctions() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role'));
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const role = localStorage.getItem('user_role');
        setUserRole(role);
        
        if (role === 'Student') {
            const firstName = localStorage.getItem('student_fname');
            const lastName = localStorage.getItem('student_lname');
            setUserName(`${firstName} ${lastName}`);
        } else if (role === 'Provider') {
            const providerName = localStorage.getItem('provider_name');
            setUserName(providerName);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { userRole, userName, handleLogout };
}

export default useNavbarFunctions;