import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from "./pages/Home"
import MarkLeave from './pages/MarkLeave'
import SignIn from './pages/SignIn'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/markleave" element={<MarkLeave/>}/>
      </Routes>
    </Router>
  )
}

export default App
