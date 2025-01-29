import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser, getIdByLogin } from '../../hooks/hooks';
import Navbar from "../../components/Navbar";

const Register = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [clientId, setClientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(clientId);
    }, [clientId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const loginExists = await getIdByLogin(login);
            setClientId(loginExists.id);
            if (loginExists.id === null && password === repeatPassword) {
                const data = await registerUser(login, password);
                console.log('Registration successful:', data);
                navigate('/Login');
            } else {
                setErrorMessage("Login already exists in database.");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <label>
                        Login:
                        <input
                            type="text"
                            name="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required={true}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </label>
                    <label>
                        Repeat Password:
                        <input
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required={true}
                        />
                    </label>
                    {errorMessage && (
                        <p style={{ color: 'red', fontSize: '0.9em', marginTop: '0.5em' }}>
                            {errorMessage}
                        </p>
                    )}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
