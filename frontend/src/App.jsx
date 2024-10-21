import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Home from "./pages/Home"
import Profile from './pages/Profile'
import Password from './pages/Password'
import FaceID from './pages/FaceID'
import AppInfo from './pages/AppInfo'
import CustomerCare from './pages/CustomerCare'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/password" element={<Password />} />
        <Route path="/face-id" element={<FaceID />} />
        <Route path="/app-info" element={<AppInfo />} />
        <Route path="/customer-care" element={<CustomerCare />} /> 
      </Routes>
    </Router>
  )
}

export default App
