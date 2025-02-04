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
                const response = await getIdByLogin(login, password);
    
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('clientId', response.clientId);
                    localStorage.setItem('role', response.role);
                    
                    if (response.role === 'ADMIN') {
                        window.location.href = `/admin/${response.clientId}`;
                    } else {
                        window.location.href = `/user/${response.clientId}`;
                    }
                }
                
            } catch (error) {
                setErrorMessage('Incorrect login or password.');
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
