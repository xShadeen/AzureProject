import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Navbar.css';
import { useParams } from 'react-router-dom';

const Navbar = () => {
    let { clientId } = useParams();

    if (clientId === undefined) {
        clientId = 3;
    }

    return (
        <div className="nav">
            <Button
                color="inherit"
                size="large"
                variant="text"
                component={Link} // Moved inside Button component
                to={`/${clientId}`} // Moved inside Button component
            >
                SuperCourses
            </Button>

            <ul className="nav-menu">
                <Button
                    color="inherit"
                    size="large"
                    variant="text"
                    component={Link} // Moved inside Button component
                    to={`/Course/OwnCourses/${clientId}`} // Moved inside Button component
                >
                    Own Courses
                </Button>
                <li> </li>
                <li className="nav-signup">
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="success"
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
