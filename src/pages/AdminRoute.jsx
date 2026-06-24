import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {
  const token = JSON.parse(localStorage.getItem("token") || '""');

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const payload = jwtDecode(token);

    if (payload.role !== "admin") {
      return <Navigate to="/StudentPage" />;
    }

    return children;
  } catch {
    return <Navigate to="/" />;
  }
}

export default AdminRoute;
