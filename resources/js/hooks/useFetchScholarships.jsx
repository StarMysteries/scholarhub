import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScholarships = async () => {
            setIsLoading(true); // Start loading
            setError(null); // Clear previous errors
            try {
                const response = await axios.get('/scholarships');
                setScholarships(response.data);
            } catch (err) {
                console.error("Error fetching scholarships:", err);
                setError(err.message || "Failed to fetch scholarships");
            } finally {
                setIsLoading(false); // Stop loading
            }
        };
        fetchScholarships();
    }, []);

    return { scholarships, isLoading, error };
}