import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignIn from './pages/SignIn'
import Home from "./pages/Home"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
