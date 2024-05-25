import { Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "@/app/authSlice";
import { useAppSelector } from "@/app/store";
import Login from "@/pages/login/Login";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); 
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
