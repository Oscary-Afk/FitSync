import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Hero con imagen de fondo */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-title">Transforma Tu Cuerpo, Transforma Tu Vida</h1>
            <p className="about-subtitle">En FitSync, creemos que cada persona tiene el potencial de alcanzar su mejor versión</p>
          </div>
        </div>

        {/* Contenido principal con imagen */}
        <div className="about-content">
          <div className="about-text">
            <h2>Nuestra Filosofía</h2>
            <p>Combinamos entrenamiento de vanguardia con nutrición personalizada y una comunidad que te impulsa a superar tus límites.</p>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Miembros Activos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfacción</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Grupo de personas entrenando en el gimnasio"
              className="about-img"
            />
          </div>
        </div>

        {/* Servicios - puedes agregar íconos con imágenes si quieres */}
        <div className="services-section">
          <h2 className="services-title">Lo Que Ofrecemos</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💪</div>
              <h3>Entrenamiento Personalizado</h3>
              <p>Programas diseñados específicamente para tus objetivos.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🥗</div>
              <h3>Plan Nutricional</h3>
              <p>Guías alimentarias personalizadas que complementan tu entrenamiento.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">👥</div>
              <h3>Comunidad Activa</h3>
              <p>Conecta con personas que comparten tus mismos objetivos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}