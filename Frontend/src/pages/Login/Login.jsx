import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { getIdByLogin } from '../../hooks/hooks'; // Adjusted to include getIdByLogin function
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
                // Próba logowania
                const response = await getIdByLogin(login, password); // Oczekujemy obiektu z tokenem, clientId i role
    
                if (response && response.token) {
                    // Zapisujemy token i clientId w localStorage
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('clientId', response.clientId);
                    localStorage.setItem('role', response.role);  // Zapisujemy rolę
                    
                    // Przekierowanie na stronę użytkownika lub admina, w zależności od roli
                    if (response.role === 'ADMIN') {
                        window.location.href = `/admin/${response.clientId}`;  // Przekierowanie na stronę admina
                    } else {
                        window.location.href = `/user/${response.clientId}`;  // Przekierowanie na stronę użytkownika
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
