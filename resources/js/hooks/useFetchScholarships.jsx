import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetchScholarships(){
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get('/scholarships');
                setScholarships(response.data);
            } catch (error) {
                console.error("Error fetching scholarships:", error);
            }
        };
        fetchScholarships();
    }, []);

    return { scholarships };
}