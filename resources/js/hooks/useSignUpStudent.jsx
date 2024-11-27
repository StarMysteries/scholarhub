import { useState } from "react";
import axios from "axios";

const useSignUpStudent = () => {
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
                "/register_student",
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
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return { signUp, isLoading, error };
};

export default useSignUpStudent;
