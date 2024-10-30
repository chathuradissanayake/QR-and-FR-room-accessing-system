import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AppInfo from "./pages/AppInfo";
import CustomerCare from "./pages/CustomerCare";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AskPermission from "./pages/AskPermission";
import MarkLeave from "./pages/MarkLeave";
import MyLogbook from "./pages/MyLogbook";
import MyPermissions from "./pages/MyPermissions";
import Success from "./pages/Success";
import ChangeUsername from "./pages/ChangeUsername";
import ChangePassword from "./pages/ChangePassword";

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
          <Route
            path="/markleave"
            element={
              <ProtectedRoute>
                <MarkLeave />
              </ProtectedRoute>
            }
          />
          <Route
            path="/askpermission"
            element={
              <ProtectedRoute>
                <AskPermission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mylogbook"
            element={
              <ProtectedRoute>
                <MyLogbook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypermissions"
            element={
              <ProtectedRoute>
                <MyPermissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/change-username"
            element={
              <ProtectedRoute>
                <ChangeUsername />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                < ChangePassword/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
