// context/authContext.js
import  { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  console.log(user)
  const updateAuth = (user, token) => {
    setUser(user);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
