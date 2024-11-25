import axios from "axios";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/userContext";

import ProtectedRoute from "./components/ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import AppInfo from "./pages/AppInfo";
import AskPermission from "./pages/AskPermission";
import ChangePassword from "./pages/ChangePassword";
import ChangeUsername from "./pages/ChangeUsername";
import ContactUs from "./pages/ContactUs";
import EntrancePage from "./pages/EntrancePage";
import Faceid from "./pages/Faceid";
import FaceRegistration from "./pages/FaceRegistration";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import MarkLeave from "./pages/MarkLeave";
import MyLogbook from "./pages/MyLogbook";
import MyPermissions from "./pages/MyPermissions";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Success from "./pages/Success";
import TypeCode from "./pages/TypeCode";

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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<TypeCode />} />

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
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
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
            path="/contactus"
            element={
              <ProtectedRoute>
                <ContactUs />
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

          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/face-id"
            element={
              <ProtectedRoute>
                <Faceid />
              </ProtectedRoute>
            }
          />

          <Route
            path="/face-registration"
            element={
              <ProtectedRoute>
                <FaceRegistration />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
