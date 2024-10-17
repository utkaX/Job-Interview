import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const isEmployer = user && user.role === "employer";

  return isEmployer ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
