import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, role } = useSelector(
    (state) => state.user,
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleProtectedRoute;