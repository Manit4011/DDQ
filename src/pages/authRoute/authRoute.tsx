import React from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(sessionStorage.getItem("access-token"));

  return isAuthenticated ? (
    <>{children}</> // Render the protected component
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

export default AuthRoute;
