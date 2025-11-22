import '../styles/Login.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function Login({onLogin}) {
    useEffect(() => {
        // ruta enpoint login, same example for others components with flask
        // fetch('/login').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err))
    
      }, [])  
  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        /*body: JSON.stringify({ email, password_encrypted: password }) */
        body: JSON.stringify({ email, password: password })
      })

      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      //const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Error en login')
        console.log(data)

      // ejemplo: backend puede devolver { token: '...', user: {...} } o { access_token: ... }
      const token = data.token ?? data.access_token ?? null
      const user = data.user ?? data

      if (token) localStorage.setItem('auth_token', token)
      if (user) localStorage.setItem('auth_user', JSON.stringify(user))

      // callback opcional para que la app padre maneje el login
      if (typeof onLogin === 'function') onLogin({ token, user })

      // redirigir tras login (ajusta según tu routing)
      window.location.href = '/home'
    } catch (err) {
      setError(err.message || 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

    return (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="eye-button"
                onClick={(e) => { e.preventDefault(); setShowPassword(v => !v); }}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div>
              <a href="/sign_up">No tienes cuenta?</a>
              <br />
              <a href="/forgot">Olvidaste la contraseña?</a>
            </div>
            <button className='submit' type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Login'}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
    );
}