import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HaulerTripRequestList from "../pages/driver/requestHauler/HaulerTripRequestList";
import TripRequestList from "../pages/user/requestHaul/tripRequestList";

const BaseRoute = () => {
  const navigate = useNavigate();
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    const type = localStorage.getItem("type");

    if (isAuthenticated) {
      if (type === "User") {
        setComponent(<TripRequestList />);
      } else if (type === "Hauler") {
        setComponent(<HaulerTripRequestList />);
      } else {
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return Component;
};

export default BaseRoute;
