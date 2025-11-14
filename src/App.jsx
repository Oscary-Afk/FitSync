import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
