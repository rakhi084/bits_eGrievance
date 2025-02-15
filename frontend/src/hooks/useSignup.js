import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, role) => {
        setIsLoading(true);
        setError(null);

        try {
            // Replace the API endpoint with your actual signup endpoint
            const response = await fetch('http://localhost:5000/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify({ ...json, role }));

            // Update the auth context with user and role
            dispatch({ type: 'LOGIN', payload: { ...json, role } });

            // Update loading state
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return { signup, isLoading, error };
};
