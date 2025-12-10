
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const candidateToken = localStorage.getItem("candidatetoken");

    return token || candidateToken ?  (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;