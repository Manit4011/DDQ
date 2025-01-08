import React from "react";
import { Navigate } from "react-router-dom";
import { selectAuth } from '../../features/authSlice/selector';
import { useSelector } from "react-redux";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const auth = useSelector(selectAuth);
  const isAuthenticated = Boolean(auth.logged_in);

  return isAuthenticated ? (
    <>{children}</> // Render the protected component
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

export default AuthRoute;
