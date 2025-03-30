import { createContext, useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [trigger, setTrigger] = useState(0);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user data from backend using custom hook
  const {
    data: userData,
    loading,
    error,
    refetch: refetchUserData // Exposed for manual triggering
  } = useFetch(userID ? `${apiUrl}/users/${userID}` : null, trigger);

  // Login: Save user ID and token
  const login = (user, token) => {
    localStorage.setItem('userID', user.id);
    localStorage.setItem('token', token);
    setUserID(user.id);
    setUserToken(token);
    setTrigger((prev) => prev + 1);
    refetchUserData();
  };

  // Logout: Clear auth state
  const logout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    setUserID(null);
    setUserToken(null);
    setTrigger((prev) => prev + 1);
  };

  return (
    <AuthContext.Provider
      value={{
        userID,
        userToken,
        userData,
        login,
        logout,
        loading,
        error,
        refetchUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
