import axios from "axios";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";

import ProtectedRoute from "./components/ProtectedRoute";
import AppInfo from "./pages/AppInfo";
import AskPermission from "./pages/AskPermission";
import ChangePassword from "./pages/ChangePassword";
import ChangeUsername from "./pages/ChangeUsername";
import CustomerCare from "./pages/CustomerCare";
import EntrancePage from "./pages/EntrancePage";
import Home from "./pages/Home";
import MarkLeave from "./pages/MarkLeave";
import MyLogbook from "./pages/MyLogbook";
import MyPermissions from "./pages/MyPermissions";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";
import TypeCode from "./pages/TypeCode";
import ResetPassword from "./pages/ResetPassword";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<TypeCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
            path="/entrancepage"
            element={
              <ProtectedRoute>
                <EntrancePage />
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
                <ChangePassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
