import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthRole, selectToken } from "../features/authSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token =
    useSelector(selectToken) || localStorage.getItem("token");

  const role =
    useSelector(selectAuthRole) || localStorage.getItem("role");

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ access granted
  return children;
};

export default ProtectedRoute;