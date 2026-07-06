import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../app/authSlice";

function getUserRoles(user) {
  if (!user) return [];

  if (Array.isArray(user.roles)) {
    return user.roles;
  }

  if (typeof user.role === "string") {
    return [user.role];
  }

  return [];
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  const userRoles = getUserRoles(user);
  const hasAccess = allowedRoles.some((role) =>
    userRoles.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}