import { useState, useEffect } from "react";
import axios from "axios";

const useFetchApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/student_applications");
        setApplications(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return { applications, loading, error };
};

export default useFetchApplications;
