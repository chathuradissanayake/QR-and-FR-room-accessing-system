import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import BottomNavigation from "./BottomNavigation";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-slate-600">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#2564e9"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="pb-12 flex justify-center min-h-screen bg-gray-50 dark:bg-slate-600">
        
        <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md dark:bg-slate-800"> {children}</div></div>

      {/* Bottom Navigation */}
      
      <BottomNavigation />
      
    </div>
  );
};

export default ProtectedRoute;
