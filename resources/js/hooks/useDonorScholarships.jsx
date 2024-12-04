import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useDonorScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const [error, setError] = useState(null);

    // Fetch scholarships
    useEffect(() => {
        const fetchDonorScholarships = async () => {
            try {
                const response = await axios.get('/donor_scholarships');
                setScholarships(response.data);
            } catch (error) {
                setError('Error fetching scholarships');
            }
        };

        fetchDonorScholarships();
    }, []);

    return { scholarships, setScholarships, error }; // Expose setScholarships
}
