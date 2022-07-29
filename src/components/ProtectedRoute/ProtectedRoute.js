import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ children, redirectTo }) => {
  
  const user = useContext(CurrentUserContext);

  console.log(user);
  
  return user ? children : <Navigate replace to={redirectTo} />;
};

export default ProtectedRoute;