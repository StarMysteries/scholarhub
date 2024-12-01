import { useState } from "react";
import axios from "axios";

const useSignUpProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
            return response.data;
        } catch (err) {
            setIsLoading(false);
            const errorMessage = err.response?.data?.message || "An error occurred";
            setError(errorMessage);
            throw err;
        }
    };

    return { signUp, isLoading, error };
};

export default useSignUpProvider;
