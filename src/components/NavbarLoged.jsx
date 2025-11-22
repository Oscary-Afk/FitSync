import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavbarLoged.css'

export default function NavbarLoged() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [userName, setUserName] = useState(null)
  /*const [avatarUrl, setAvatarUrl] = useState(null)*/

  useEffect(() => {
    const raw = localStorage.getItem('auth_user') || localStorage.getItem('user')
    if (raw) {
      try {
        const u = typeof raw === 'string' ? JSON.parse(raw) : raw
        const name = u.nombre || u.name || u.first_name || u.username || (u.email ? u.email.split('@')[0] : null)
        setUserName(name || 'Usuario')
        /*setAvatarUrl(u.avatar || u.avatarUrl || u.photo || null)*/
      } catch {
        setUserName(String(raw))
      }
    } else {
      setUserName('Invitado')
    }
  }, [])

  const avatarUrl = '/vite.svg'
  const initials = userName ? userName.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() : ''

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <nav className="navbar-container">
      <div className='navbar-menu'>
        <button className='menu-mobile' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          { isMenuOpen ? '≡' : 'X' }
        </button>
      </div>

      <div className="navbar-links">
        {/* ... */}
      </div>

      <div className="navbar-logo-name">
        <img src="logo_fitsync.png" alt="logo_fitsync" className="logo-img" />
        <span className="logo-text">FITCLUB</span>
      </div>

      <div className="navbar-right">
        <div className="user-box" title={userName} onClick={toggleDropdown}>
          {avatarUrl
            ? <img className="user-avatar" src={avatarUrl} alt={userName} />
            : <div className="user-avatar user-initials">{initials}</div>
          }
          <span className="user-name">{userName}</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="user-info">
              <p>Nombre: {userName}</p>
              <p>Email: user@example.com</p>
            </div>
            <Link to="/profile" className="dropdown-item">Perfil</Link>
            <button className="dropdown-item">Actualizar datos</button>
            <button className="dropdown-item">Eliminar usuario</button>
          </div>
        )}
      </div>
    </nav>
  )
}   