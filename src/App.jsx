import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { Home } from './components/Home.jsx';
import { Services } from './components/Services.jsx';
import Payment from './components/Payment.jsx';
import Gallery from './components/Gallery.jsx';
import About from './components/About'
import Footer from './components/Footer.jsx';


function App() {
  const [count, setCount] = useState(0) 
  // usestate gi

  useEffect(() => {
    // useEffect es para usar javascript puro directo y código que se ejecuta después del renderizado
  }, [count])

  return (
    <>

   <Navbar/>

    <Home/>

    <Services />
    
    <Payment />

    <Gallery />
    
    <About />
    
    <Footer />
    </>
  )
}

export default App
