import React from 'react';
import '../styles/MemberWelcome.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export function MemberWelcome() {
//   const userName = 'Jane Doe'; // Static name for now
  const usuario = localStorage.getItem('auth_user') || localStorage.getItem('user');

  const [fechaActual, setFechaActual] = useState(new Date());
  const [fechaRenovacion, setFechaRenovacion] = useState(
    new Date("2025-12-31") // fecha inventada
  );
  const [diasRestantes, setDiasRestantes] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // actualizar fecha actual cada vez que se monte el componente
    const hoy = new Date();
    setFechaActual(hoy);

    // calcular diferencia en días
    const diffMs = fechaRenovacion - hoy;
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setDiasRestantes(diffDias);
  }, [fechaRenovacion]);

  const handleRenovar = () => {
    navigate("/payment"); // redirige a /payment
  };

  return ( 
    <>
    <div className="member-welcome">
      <div className="summary-card">
        <h3>Saludos {usuario}, Entraste al gym</h3>
        <p>¡Bienvenido a FitSync!</p>
      </div>

      <div className="summary-card">
        <h2>Renovación</h2>
        <p>Fecha actual: {fechaActual.toLocaleDateString()}</p>
        <p>Fecha de renovación: {fechaRenovacion.toLocaleDateString()}</p>
        <p>Faltan {diasRestantes} días para renovar</p>
        <button className='btn-renovar' onClick={handleRenovar}>Renovar</button>
      </div>
    </div>

    </>
//     <div className="member-welcome">
//       <h2>¡Hola, {userName}!</h2>
//       <p>Aquí tienes un resumen de tu actividad reciente.</p>
//       <div className="welcome-summary">
//         <div className="summary-card">
//           <h3>Próxima Clase</h3>
//           <p>Yoga - Hoy a las 6:00 PM</p>
//         </div>
//         <div className="summary-card">
//           <h3>Saludo, Entraste al gym</h3>
//           <p>¡Bienvenido a FitSync! - 10/10/2025</p>
//         </div>
//         <div className="summary-card">
//           <h3>Tu entrenador</h3>
//           <p>David</p>
//         </div>
//       </div>
//     </div>
  );
}
