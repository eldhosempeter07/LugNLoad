import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HaulerTripRequestList from "../pages/driver/requestHauler/HaulerTripRequestList";
import TripRequestList from "../pages/user/requestHaul/tripRequestList";

const NonAuthRoute = ({ element }) => {
  const navigate = useNavigate();
  const [Component, setComponent] = useState(null);
  const isAuthenticated = !!localStorage.getItem("token");
  const type = localStorage.getItem("type");
  useEffect(() => {
    if (isAuthenticated) {
      if (type === "User") {
        setComponent(<TripRequestList />);
      } else if (type === "Hauler") {
        setComponent(<HaulerTripRequestList />);
      } else {
        return element;
      }
    } else {
    }
  }, [navigate]);
  return element;

  return Component;
};

export default NonAuthRoute;
