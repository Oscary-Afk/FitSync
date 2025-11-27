import React from 'react';
import '../styles/MemberWelcome.css';

export function MemberWelcome() {
  const userName = 'Jane Doe'; // Static name for now

  return (
    <div className="member-welcome">
      <h2>¡Hola, {userName}!</h2>
      <p>Aquí tienes un resumen de tu actividad reciente.</p>
      <div className="welcome-summary">
        <div className="summary-card">
          <h3>Próxima Clase</h3>
          <p>Yoga - Hoy a las 6:00 PM</p>
        </div>
        <div className="summary-card">
          <h3>Saludo, Entraste al gym</h3>
          <p>¡Bienvenido a FitSync! - 10/10/2025</p>
        </div>
        <div className="summary-card">
          <h3>Tu entrenador</h3>
          <p>David</p>
        </div>
      </div>
    </div>
  );
}
