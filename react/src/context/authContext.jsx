import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  let isLoggedIn = false;

  const updateAuth = (user, token) => {
    setUser(user);
    setToken(token);
    console.log("login done in use context");
    isLoggedIn = true;
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
