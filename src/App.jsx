import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing.jsx'
import { Register }  from './pages/Register.jsx'
import { Login } from './pages/Login.jsx'
import { IndexPage } from './pages/IndexPage.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign_up" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
