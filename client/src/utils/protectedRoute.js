import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(!isAuthenticated);
  const type = localStorage.getItem("type");
  console.log(type === "User");
  useEffect(() => {
    if (!isAuthenticated && type !== "User") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null; // Render the element only if authenticated
};

export default ProtectedRoute;
