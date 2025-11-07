import '../styles/Login.css';
import React from 'react';

export default function Login() {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form action="" className='login'>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}