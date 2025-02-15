import { GrievancesContext } from "../context/GrievanceContext"; // Update the context import
import { useContext } from "react";

export const useGrievancesContext = () => { // Update the hook name
    const context = useContext(GrievancesContext); // Update the context used

    if (!context) {
        throw Error("useGrievancesContext must be used inside a GrievancesContextProvider"); // Update the error message
    }

    return context;
}
