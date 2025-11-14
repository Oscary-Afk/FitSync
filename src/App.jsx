import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { Home } from './components/Home.jsx';
import { Services } from './components/Services.jsx';
import Payment from './components/Payment.jsx';
import Gallery from './components/Gallery.jsx';
import About from './components/About'
import Footer from './components/Footer.jsx';

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {
  
  return (
    <>

   <Navbar/>

    <Home/>

    <Services />
    
    <Payment />

    <Gallery />
    
    <About />

    <Register />
    
    <Footer />
    </>
  )
}

export default App
