import React from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  return (
    <nav className="navbar-container">
      <div className='navbar-menu'>
        <button className='menu-mobile' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          { isMenuOpen ? '≡' : 'X' }
        </button>
      </div>
      <div className="navbar-links">
        <a href="#home" className="nav-link active">HOME</a>
        <a href="#about" className="nav-link">ABOUT</a>
        <a href="#classes" className="nav-link">OUR CLASSES</a>
      </div>
      
      <div className="navbar-logo-name">
        {/* Aquí iría el logo si lo incluyeras */}
        <img src="logo_fitsync.png" alt="logo_fitsync" className="logo-img" />
        <span className="logo-text">FITCLUB</span>
      </div>

      <div className="navbar-right">
        <a href="#blog" className="nav-link">BLOG</a>
        <a href="#contact" className="nav-link">CONTACT</a>


        <a href="/register" target="_blank" rel="noreferrer">
          <button type="button" className="join-button">Join Now</button>
        </a>

        
      </div>
    </nav>
  )
}   