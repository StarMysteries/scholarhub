import { useState } from "react";
import axios from "axios";

const useScholarshipStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to toggle scholarship status
    const toggleScholarshipStatus = async (scholarshipId) => {
        setLoading(true);
        setError(null);
        try {
            // Assuming the Laravel route is '/scholarships/{id}/status'
            const response = await axios.put(`/scholarships/${scholarshipId}/status`);
            setLoading(false);
            return response.data; // Return updated scholarship data
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data : "An error occurred");
        }
    };

    return { toggleScholarshipStatus, loading, error };
};

export default useScholarshipStatus;
