import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const AdminGrievanceDetails = ({ grievance }) => {
    const { dispatch } = useGrievancesContext();
    const { user } = useAuthContext();

    const [status, setStatus] = useState(grievance.status || ''); // Initialize with the current status
    const [reply, setReply] = useState(grievance.reply || ''); // Initialize with the current reply
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);



    // Handle status change
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };


    // Open the reply popup
    const openReplyPopup = () => {
        setIsReplyOpen(true);
    };

    // Close the reply popup
    const closeReplyPopup = () => {
        setIsReplyOpen(false);
    };

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('http://localhost:5000/api/grievances/' + grievance._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: 'DELETE_GRIEVANCE', payload: json });
        }
    }

    const handleSubmit = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/grievances/${grievance._id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status, reply })
            });

            if (response.ok) {
                // Handle successful reply submission here, e.g., close the popup
                // closeReplyPopup();
                // Set the success message
                setIsSubmitSuccess(true);
                // Handle successful update here
                const updatedGrievance = await response.json();
                dispatch({
                    type: 'UPDATE_GRIEVANCE',
                    payload: updatedGrievance
                });
            } else {
                // Handle update error
                console.error(`Error updating grievance: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Network error or unexpected error:', error);
        }
    };
    

    return (
        <div className="grievance-details">
            <h4>{grievance.title}</h4>
            <p><strong>Description:</strong> {grievance.description}</p>
            <p><strong>User Type:</strong> {grievance.userType}</p>
            <p><strong>Department:</strong> {grievance.department}</p>
            <p><strong>Category:</strong> {grievance.category}</p>
            <p><strong>Reply:</strong> {grievance.reply}</p>
            <p><strong>Status:</strong> {grievance.status}</p>
            <div className="time">
            <p className="posted-time">{formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })}</p>
            </div>
            {user && (
                <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            )}

            <div className="reply-button-container">
                <button onClick={openReplyPopup}>Response</button>
            </div>
            {isReplyOpen && (
                <div className="popup">
                    {/* Textarea for reply */}
                    <textarea
                        rows="4"
                        cols="50"
                        value={reply}
                        onChange={handleReplyChange}
                    ></textarea>

                    {/* Status select */}
                    <select
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className="button-container">
                    <button onClick={closeReplyPopup}>Close</button>
                    <button onClick={handleSubmit}>Submit</button>
                    </div>
                    {isSubmitSuccess && (
                    <p className="success-message">Successfully submitted</p>
                    )}
                </div>
            )}
            
        </div>
    );
}

export default AdminGrievanceDetails;