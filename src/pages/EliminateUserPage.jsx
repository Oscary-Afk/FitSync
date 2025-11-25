import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ELiminateUserPage.css'

export default function EliminateUserPage() {
    return (
        <div className="eliminate-user-page">
            <div className="eliminate-card">
                <h1>¿Estás seguro de eliminar tu cuenta?</h1>
                <p>Esta acción es irreversible y perderás todos tus datos.</p>
                <div className="actions">
                    <button className="btn-delete">Eliminar permanentemente</button>
                    <Link to="/home" className="btn-cancel">Cancelar</Link>
                </div>
            </div>
        </div>
    )
}