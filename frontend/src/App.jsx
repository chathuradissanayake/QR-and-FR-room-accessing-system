import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import FaceID from "./pages/FaceID";
import AppInfo from "./pages/AppInfo";
import CustomerCare from "./pages/CustomerCare";
import Register from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoute>
                <Password />
              </ProtectedRoute>
            }
          />
          <Route
            path="/face-id"
            element={
              <ProtectedRoute>
                <FaceID />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app-info"
            element={
              <ProtectedRoute>
                <AppInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-care"
            element={
              <ProtectedRoute>
                <CustomerCare />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
