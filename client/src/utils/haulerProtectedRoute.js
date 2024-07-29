import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HaulerProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists
  const type = localStorage.getItem("type");
  useEffect(() => {
    if (!isAuthenticated && type !== "Hauler") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null; // Render the element only if authenticated
};

export default HaulerProtectedRoute;
