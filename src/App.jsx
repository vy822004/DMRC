import React, { useState } from 'react'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import AdminLogin from './assets/components/AdminLogin'
import Otp from './assets/components/Otp'
import Home from './assets/components/Home'
import Application from './assets/components/Application'
import Arcform from './assets/components/Archform'
import Civilform from './assets/components/Civilform'
import Head from  './assets/components/Head'
import Arch_Applications from './assets/components/Arch_applications'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/" element={<Home />} />
        <Route path="/application/:department" element={<Application />} />
        <Route path="/archform" element={<Arcform />} />
        <Route path="/civilform" element={<Civilform />} />
        <Route path="/head" element={<Head />} />
        <Route path="/arch_applications" element={<Arch_Applications />} />




        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
