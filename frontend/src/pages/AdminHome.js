import React, { useEffect, useState } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import AdminGrievanceDetails from "../components/AdminGrievanceDetails";
import { Puff } from "react-loading-icons"; // Import the Puff loader

const AdminHome = () => {
  const { grievances, dispatch } = useGrievancesContext();
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

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
        setIsLoading(false); // Set isLoading to false when the request is complete
      }
    };

    if (user) {
      setIsLoading(true); // Set isLoading to true before making the request
      fetchGrievances();
    }
  }, [dispatch, user]);

  // Check if grievances is null or undefined
  if (isLoading) {
    return <div className="loader-overlay">
    <Puff width={200} height={200} /> {/* Adjust size and color */}
  </div>
  }

  // Check if grievances is null or undefined
  if (!grievances) {
    return <div>Loading...</div>;
  }

  // Extract unique category names from grievances, including "All"
  const categories = [...new Set(['All', ...grievances.map(grievance => grievance.category)])];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home">
      <div className="category-buttons">
        <h3>Choose the Category:</h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
    
      <div className="grievances">
        <h3>Grievances</h3>
        <hr />
        {grievances.map((grievance) => (
          (selectedCategory === "All" || grievance.category === selectedCategory) && (
            <AdminGrievanceDetails key={grievance._id} grievance={grievance} />
          )
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
