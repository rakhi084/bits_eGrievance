import { createContext, useReducer } from "react";

export const GrievancesContext = createContext();

export const grievancesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GRIEVANCES':
            return {
                grievances: action.payload
            };
        case 'CREATE_GRIEVANCE':
            return {
                grievances: [action.payload, ...state.grievances]
            };
        case 'DELETE_GRIEVANCE':
            return {
                grievances: state.grievances.filter((g) => g._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export const GrievancesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(grievancesReducer, {
        grievances: null
    });

    return (
        <GrievancesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GrievancesContext.Provider>
    );
}
