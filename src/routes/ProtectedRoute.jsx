import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../app/authSlice";

function getUserRoles(user) {
  if (!user) return [];

  if (Array.isArray(user.roles)) return user.roles;
  if (typeof user.role === "string") return [user.role];

  // Current project sets `name: "Administrator"` on login payload.
  if (typeof user.name === "string") return [user.name];

  return [];
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  // Backward-compatible behavior: if a route doesn't specify allowedRoles,
  // treat it as any authenticated user.
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  const userRoles = getUserRoles(user);
  const hasAccess = allowedRoles.some((r) => userRoles.includes(r));

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
}

