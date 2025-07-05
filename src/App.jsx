import React, { useState } from 'react'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import AdminLogin from './assets/components/AdminLogin'
import Otp from './assets/components/Otp'
import Home from './assets/components/Home'
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
import Elec_Applications1 from './assets/components/Elec_Applications1'
import Elec_Applications2 from './assets/components/Elec_Applications2'
import ElecApplicationDetails from './assets/components/ElecApplicationDetails'
import ElecApplicationList from './assets/components/ElecApplicationList'
import ElecApplicationList1 from './assets/components/ElecApplicationList1'
import ElecApplicationList2 from './assets/components/ElecApplicationList2'
import UserDashboard from './assets/components/UserDashboard'


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
        
        <Route path="/civilform" element={<Civilform />} />
        <Route path="/head" element={<Head />} />
        <Route path="/elecform" element={<Elecform />} />

        <Route path="/archform" element={<Arcform />} />
        <Route path="/arch_applications" element={<Arch_Applications />} />
        <Route path="/arch_applications1" element={<Arch_Applications1 />} />
        <Route path="/arch_applications2" element={<Arch_Applications2 />} />
        <Route path="/application/architecture/:id" element={<ArchApplicationDetails />} />
        <Route path="/application/architecture/list" element={<ArchApplicationList />} />
        <Route path="/application/architecture1/list" element={<ArchApplicationList1 />} />
        <Route path="/application/architecture2/list" element={<ArchApplicationList2 />} />

        <Route path="/elecform" element={<Elecform />} />
        <Route path="/elec_applications" element={<Elec_Applications />} />
        <Route path="/elec_applications1" element={<Elec_Applications1 />} />
        <Route path="/elec_applications2" element={<Elec_Applications2 />} />
        <Route path="/application/electrical/:id" element={<ElecApplicationDetails />} />
        <Route path="/application/electrical/list" element={<ElecApplicationList />} />
        <Route path="/application/electrical1/list" element={<ElecApplicationList1 />} />
        <Route path="/application/electrical2/list" element={<ElecApplicationList2 />} />
       
        <Route path="/userdashboard" element={<UserDashboard />} />








        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
