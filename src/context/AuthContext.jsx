import { createContext, useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [trigger, setTrigger] = useState(0);

  // 🔄 Fetch user data using useFetch
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data: userData, loading, error } = useFetch(userID ? `${apiUrl}/user/${userID}` : null, trigger);

  console.log(userToken)
  console.log(userID)

  // 🔐 Login: Save ID and refetch user
  const login = (token,user) => {
    localStorage.setItem('userID', user.id);
    localStorage.setItem('token', token);
    setUserID(user.id);
    setUserToken(token)
    setTrigger((prev) => prev + 1);
  };

  // 🔓 Logout: Remove everything
  const logout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    setUserID(null);
    setTrigger((prev) => prev + 1); // Force re-fetch
  };


  return (
    <AuthContext.Provider value={{ userID, userData, login, logout, loading, error, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);