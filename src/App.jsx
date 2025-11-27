import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing.jsx'
import { Register } from './pages/Register.jsx'
import { Login } from './pages/Login.jsx'
import { IndexPage } from './pages/IndexPage.jsx'
import { Profile } from './pages/Profile.jsx'
import EliminateUserPage from './pages/EliminateUserPage.jsx'
import { Settings } from './pages/Settings.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<IndexPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/eliminate-user" element={<EliminateUserPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
