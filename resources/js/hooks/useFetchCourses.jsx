import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchCourses() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
                setError(error);
            });
    }, []);

    return { courses, error };
}

export default useFetchCourses;
