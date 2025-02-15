import { useAuthContext } from './useAuthContext'; // Update the context import to your GrievancesContext
import { useGrievancesContext } from './useGrievancesContext'; // Update to use your GrievancesContext or other relevant context

export const useLogout = () => {
    const { dispatch } = useAuthContext(); // Update to use your GrievancesContext
    const { dispatch: grievancesDispatch } = useGrievancesContext(); // Update to use your GrievancesContext or other relevant context

    const logout = () => {
        // Remove user from storage
        localStorage.removeItem('user');

        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });

        // If needed, you can dispatch actions to reset or clear other context data, such as grievances
        // Example:
        grievancesDispatch({ type: 'SET_GRIEVANCES', payload: null });
    };

    return { logout };
}
