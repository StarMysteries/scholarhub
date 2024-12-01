import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function useNavbarFunctions() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(localStorage.getItem('user_role'));
    const [userName, setUserName] = useState("");
    const [providerData, setProviderData] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('user_role');
        const userID = localStorage.getItem('user_id');
        setUserRole(role);

        if (role === 'Provider') {
            fetchProviderData(userID); // Fetch provider data
        } else if (role === 'Student') {
            const firstName = localStorage.getItem('student_fname');
            const lastName = localStorage.getItem('student_lname');
            setUserName(`${firstName} ${lastName}`);
        } else if (role === 'Admin') {
            const adminName = localStorage.getItem('admin_name');
            setUserName(adminName);
        }
    }, []);

    const fetchProviderData = async (userID) => {
        try {
            const response = await axios.get(`/provider/${userID}`);
            setProviderData(response.data); // Store provider data
            setUserName(response.data.provider_name); // Update name for Navbar
        } catch (error) {
            console.error('Error fetching provider data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return { userRole, userName, providerData, handleLogout };
}

export default useNavbarFunctions;