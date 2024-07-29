import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import ProtectedRoute from "../utils/protectedRoute";

const RouteComponent = ({ element }) => {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      }
    >
      <ProtectedRoute element={element} />
    </Suspense>
  );
};

export default RouteComponent;
