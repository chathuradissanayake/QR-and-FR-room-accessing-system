import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AskPermission from './pages/AskPermission'
import Home from "./pages/Home"
import MarkLeave from './pages/MarkLeave'
import MyLogbook from './pages/MyLogbook'
import MyPermissions from './pages/MyPermissions'
import SignIn from './pages/SignIn'
import Success from './pages/Success'
import MyProfile from './pages/MyProfile';
import ChangeUsername from './pages/ChangeUsername';
import ChangePassword from './pages/ChangePassword';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/markleave" element={<MarkLeave/>}/>
        <Route path="/askpermission" element={<AskPermission/>}/>
        <Route path="/mylogbook" element={<MyLogbook/>}/>
        <Route path="/mypermissions" element={<MyPermissions/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/change-username" element={<ChangeUsername />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  )
}

export default App
