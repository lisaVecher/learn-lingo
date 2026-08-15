import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import Loader from "../Loader/Loader";

function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Loader text="Checking authorization..." />;
  }

  if (!user) {
    return <Navigate to="/teachers" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
