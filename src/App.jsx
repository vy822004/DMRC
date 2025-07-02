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
import Elecform from './assets/components/Elecform'
import ArchApplicationDetails from './assets/components/ArchApplicationDetails'
import ArchApplicationList from './assets/components/ArchApplicationList'
import Elec_Applications from './assets/components/Elec_Applications'
import Arch_Applications1 from './assets/components/Arch_Applications1'
import ArchApplicationList1 from './assets/components/ArchApplicationList1'
import Arch_Applications2 from './assets/components/Arch_Applications2'
import ArchApplicationList2 from './assets/components/ArchApplicationList2'

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
        <Route path="/application/architecture" element={<Application />} />
        <Route path="/archform" element={<Arcform />} />
        <Route path="/civilform" element={<Civilform />} />
        <Route path="/head" element={<Head />} />
        <Route path="/elecform" element={<Elecform />} />
        <Route path="/arch_applications" element={<Arch_Applications />} />
        <Route path="/arch_applications1" element={<Arch_Applications1 />} />
        <Route path="/arch_applications2" element={<Arch_Applications2 />} />
        <Route path="/application/architecture/:id" element={<ArchApplicationDetails />} />
        <Route path="/application/architecture/list" element={<ArchApplicationList />} />
        <Route path="/application/architecture1/list" element={<ArchApplicationList1 />} />
        <Route path="/application/architecture2/list" element={<ArchApplicationList2 />} />

        <Route path="/elec_applications" element={<Elec_Applications />} />




        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
