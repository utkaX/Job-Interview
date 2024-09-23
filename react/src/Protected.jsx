import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
  
    if (!user) {
      alert("User has to login first");
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  

export default ProtectedRoute