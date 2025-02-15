import { useState } from "react";
import { useGrievancesContext } from "../hooks/useGrievancesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GrievanceForm = () => {
    const { dispatch } = useGrievancesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userType, setUserType] = useState('');
    const [department, setDepartment] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to create a grievance');
            return;
        }

        const grievance = { title, description, userType, department, category };

        const response = await fetch('http://localhost:5000/api/grievances/', {
            method: 'POST',
            body: JSON.stringify(grievance),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setDescription('');
            setUserType('');
            setDepartment('');
            setCategory('');
            setError(null);
            setEmptyFields([]);
            console.log('New grievance added', json);
            dispatch({ type: "CREATE_GRIEVANCE", payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Grievance</h3>
            <hr/>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="Title"
            />

            <label>User Type:</label>
            <select
                onChange={(e) => setUserType(e.target.value)}
                value={userType}
                className={emptyFields.includes('userType') ? 'error' : ''}
            >   
                <option value=''>Select</option>             
                <option value="Anonymous">Anonymous</option>
                <option value={user.email}>{user.email}</option>
            </select>    

            <label>Department:</label>
            <select
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                className={emptyFields.includes('department') ? 'error' : ''}
            >    
                <option value=''>Select</option>            
                <option value="Anonymous">Anonymous</option>
                <option value="Information Science and Engineering">Information Science and Engineering</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence and Machine Learning</option>
            </select>  

            <label>Category:</label>
            <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes('category') ? 'error' : ''}
            >    
                <option value=''>Select</option>            
                <option value="Academics">Academics</option>
                <option value="BIP Portal">BIP website</option>
                <option value="CoE">CoE</option>
                <option value="Fees">Fees</option>
                <option value="Hostel">Hostel</option>
                <option value="Non-Academics">Non-Academics</option>
            </select>     

            <label>Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder="Description"
            ></textarea>

            <button>Submit Grievance</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default GrievanceForm;
