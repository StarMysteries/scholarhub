import { useState } from 'react';
import axios from 'axios';

const useSubmitScholarship = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitScholarship = async (data) => {
       

        setLoading(true);
        setError(null);

        try {
            //console.log("Sending data to API:", data); // Log the data being sent to the API
            const response = await axios.post('/create_scholarships', data);
            setLoading(false);
            console.log("From the API Response:", response.data); // Log the API response
            return response.data; // Success response
        } catch (err) {
            setLoading(false);
            console.error("Error in HOOK occurred while submitting scholarship:", err); // Log any errors that occur
            throw err; // Return the error for handling
        }
    };

    return { submitScholarship, loading, error };
};

export default useSubmitScholarship;
