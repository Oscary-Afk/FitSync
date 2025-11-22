import { useState, useEffect } from 'react'
import '../styles/NavbarLoged.css'

export default function NavbarLoged() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
    } catch (e) {
      console.error('Logout error', e)
    } finally {
      // limpiar estado local y redirigir (cliente)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login' // o '/' según tu ruta
    }
  }

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

      <div className="navbar-right menu-profile-container">
        <button className="profile-menu" onClick={() => setIsMenuOpen2(!isMenuOpen2)}>
          <div className="user-box" title={userName}>
            {avatarUrl
              ? <img className="user-avatar" src={avatarUrl} alt={userName} />
              : <div className="user-avatar user-initials">{initials}</div>
            }
            <span className="user-name">{userName}</span>
          </div>
        </button>
        <div className="profile-menu-content" style={{display: isMenuOpen2 ? 'flex' : 'none'}}>
            <a className="profile-menu-item" href='/profile'>
              Editar perfil
            </a>
            <button className="profile-menu-item" onClick={handleLogout}>
              Cerrar sesión
            </button>
        </div>
      </div>
    </nav>
  )
}   