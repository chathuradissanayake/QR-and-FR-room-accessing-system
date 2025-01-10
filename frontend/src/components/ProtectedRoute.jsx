import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

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
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;