import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Button from '@mui/material/Button';
import './Navbar.css';

const Navbar = () => {
    let { clientId } = useParams();
    const navigate = useNavigate(); // Use useNavigate for navigation

    if (clientId === undefined) {
        clientId = 3;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        navigate('/'); 
    };

    return (
        <div className="nav">
            <Button
                color="inherit"
                size="large"
                variant="text"
                component={Link}
                to={`/${clientId}`}
            >
                SuperCourses
            </Button>

            <ul className="nav-menu">
                <Button
                    color="inherit"
                    size="large"
                    variant="text"
                    component={Link}
                    to={`/Course/OwnCourses/${clientId}`}
                >
                    Own Courses
                </Button>
                <li> </li>
                <li className="nav-signup">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleLogout} // Wywołanie funkcji przy kliknięciu
                    >
                        Logout
                    </Button>
                </li>
                <li>
                    <Button
                        component={Link}
                        to={`/user/${clientId}/CourseForm`}
                        variant="contained"
                        color="success"
                    >
                        Create Course
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
