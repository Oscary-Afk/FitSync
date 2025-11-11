import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import '../styles/Register.css'

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      
      const { error, data } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono
          }
        }
      })

      if (error) throw error

      setMessage('Revisa tu email para verificar la cuenta.')
      setForm({ nombre: '', apellido: '', email: '', telefono: '', password: '' })
    } catch (err) {
      setMessage(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} className="register">
        <input name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Nombre" />
        <input name="apellido" value={form.apellido} onChange={handleChange} type="text" placeholder="Apellido" />
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" />
        <input name="telefono" value={form.telefono} onChange={handleChange} type="number" placeholder="Telefono" />
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" />
        <div><a href="/login">Tienes ya una cuenta?</a></div>
        <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  )
}