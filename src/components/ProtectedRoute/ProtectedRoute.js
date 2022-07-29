import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, loggedIn, redirectTo }) => {
  
  const user = useContext(CurrentUserContext);
  console.log(loggedIn);
  return loggedIn ? children : <Navigate replace to={redirectTo} />;
};

export default ProtectedRoute;