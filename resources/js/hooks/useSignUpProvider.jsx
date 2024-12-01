import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignUpProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signUp = async (formData) => {
        try {
            setIsLoading(true);
            setError(null);

            const form = new FormData();
            for (const key in formData) {
                form.append(key, formData[key]);
            }

            const response = await axios.post(
                "/register_provider",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setIsLoading(false);
            navigate("/login");
            return response.data;
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || "An error in provider occurred hooks");
        }
    };

    return { signUp, isLoading, error };
};

export default useSignUpProvider;
