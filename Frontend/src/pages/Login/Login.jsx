import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { getIdByLogin } from '../../hooks/hooks';
import Navbar from "../../components/Navbar";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [clientId, setClientId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('Client ID:', clientId);
    }, [clientId]);

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (login !== '' && password !== '') {
            try {
                const loginExists = await getIdByLogin(login);
                if (loginExists && loginExists.password === password) {
                    setClientId(loginExists.id);
                    setErrorMessage('');

                    window.location.href = `/user/${loginExists.id}`;

                } else {
                    setErrorMessage('Incorrect login or password.');
                }
            } catch (error) {
                console.error('Error during sign up:', error);
                setErrorMessage('An error occurred during login. Please try again later.');
            }
        } else {
            setErrorMessage('Both fields are required.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <form className="register-form" onSubmit={handleSignUp}>
                    <h2>Login</h2>
                    <label>
                        Login:
                        <input
                            type="text"
                            name="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {errorMessage && (
                        <p style={{ color: 'red', fontSize: '0.9em', marginTop: '0.5em' }}>
                            {errorMessage}
                        </p>
                    )}
                    <button type="submit">Sign-up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
