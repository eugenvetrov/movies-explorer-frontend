import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, redirectTo }) => {
    console.log(loggedIn);
  return loggedIn ? children : <Navigate replace to={redirectTo} />;
};

export default ProtectedRoute;