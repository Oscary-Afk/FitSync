
import React from 'react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <section className="Dashboard">
      <div className="Dashboard-container">
        <div className="Dashboard-content">
          <div className="dashboard-header">
            <h2>Dashboard</h2>
          </div>
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="dashboard-card-content">
                <div className="dashboard-card-icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="dashboard-card-info">
                  <h3>Usuarios</h3>
                  <p>10</p>
                </div>
              </div>
            </div>
            
            {/* Card de usuarios activos */}
            <div className="dashboard-card">
              <div className="dashboard-card-content">
                <div className="dashboard-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="dashboard-card-info">
                  <h3>Usuarios Activos</h3>
                  <p>10</p>
                </div>
              </div>
            </div>

            {/* Card de usuarios no activos */}
            <div className="dashboard-card">
              <div className="dashboard-card-content">
                <div className="dashboard-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="dashboard-card-info">
                  <h3>Usuarios No Activos</h3>
                  <p>10</p>
                </div>
              </div>
            </div>

            {/* Card de usuarios no activos */}
            <div className="dashboard-card">
              <div className="dashboard-card-content">
                <div className="dashboard-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="dashboard-card-info">
                  <h3>Usuarios No Activos</h3>
                  <p>10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}   