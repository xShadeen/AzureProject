import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Navbar.css';

const Navbar = () => {
        return (
            <div className="nav">

                <ul className="nav-menu">
                    <Button
                        color="inherit"
                        size="large"
                        variant="text"
                        component={Link} // Moved inside Button component
                        to={`/`} // Moved inside Button component
                    >
                        SuperCourses
                    </Button>
                    <li></li>
                    <li> </li>
                    <li className="nav-signup">
                        <Button
                            component={Link}
                            to="/Login"
                            variant="contained"
                            color="success"
                        >
                            Sign-up
                        </Button>
                    </li>
                    <li>
                        <Button
                            component={Link}
                            to="/Register"
                            variant="contained"
                            color="success"
                        >
                            Register
                        </Button>
                    </li>
                </ul>
            </div>
        );
}

export default Navbar;
