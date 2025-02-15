import { useEffect, useState } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Puff } from "react-loading-icons"; // Import the Puff loader

// Import components
import UserGrievanceDetails from "../components/UserGrievanceDetails";
import GrievanceForm from "../components/GrievanceForm";

const UserHome = () => {
  const { grievances, dispatch } = useGrievancesContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/grievances', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'X-User-Role': user.role,
          }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_GRIEVANCES', payload: json });
        }
      } catch (error) {
        console.error('Error fetching grievances:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      setIsLoading(true);
      fetchGrievances();
    }
  }, [dispatch, user]);

  return (
    <div className="user-home">
      <div className="grievanceForm">
        <GrievanceForm />
      </div>
      <div className="grievances">
        {isLoading && (
          <div className="loader-overlay">
            <Puff width={200} height={200} />
          </div>
        )}

        <h3>Your Grievances</h3>
        <hr />
        
        {!isLoading && grievances && grievances.map((grievance) => (
          <UserGrievanceDetails key={grievance._id} grievance={grievance} />
        ))}
      </div>
    </div>
  );
};

export default UserHome;    