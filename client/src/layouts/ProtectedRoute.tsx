import { Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "@/app/authSlice";
import { useAppSelector } from "@/app/store";
import Login from "@/pages/login/Login";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust time as needed
  }, []);

  if (loading) {
    // You can render a loading indicator here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Login />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
