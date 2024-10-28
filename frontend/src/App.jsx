import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AskPermission from './pages/AskPermission'
import Home from "./pages/Home"
import MarkLeave from './pages/MarkLeave'
import MyLogbook from './pages/MyLogbook'
import MyPermissions from './pages/MyPermissions'
import SignIn from './pages/SignIn'
import Success from './pages/Success'

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
      </Routes>
    </Router>
  )
}

export default App
