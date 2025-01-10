import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token is expired
            localStorage.removeItem('token');
            setUser(null);
            navigate('/signin');
          } else {
            const { data } = await axios.get('/api/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data);
          }
        } catch (error) {
          console.log('Error fetching user:', error);
          setUser(null);
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};