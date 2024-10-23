import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Home from "./pages/Home"
import Profile from './pages/Profile'
import Password from './pages/Password'
import FaceID from './pages/FaceID'
import AppInfo from './pages/AppInfo'
import CustomerCare from './pages/CustomerCare'
import Register from './pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <Router>
      <Toaster position='top-center' toastOptions={{duration :2000}}/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home/>}/>
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
