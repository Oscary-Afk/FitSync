import '../styles/Register.css';
import React from 'react';

export default function Register() {
    return (
        <div className="register-container">
            <h1>Registro</h1>
            <form action="" className='register'>
                <input type="text" placeholder="Nombre" />
                <input type="text" placeholder="Apellido" />
                <input type="email" placeholder="Email" />
                <input type="number" placeholder="Telefono" />
                <input type="password" placeholder="Password" />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}