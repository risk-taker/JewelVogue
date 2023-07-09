import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequiresAuth = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}; 