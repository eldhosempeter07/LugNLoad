import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DELETE_REQUEST_HAUL,
  GET_REQUEST_HAULS,
  GET_REQUEST_HAUL_BY_ID,
} from "../../../services/graphql/user/haulRequest";
import ModalPopup from "../../../components/Popup.jsx";

const TripRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REQUEST_HAUL_BY_ID, {
    variables: { id: parseInt(id) },
  });

  const [deleteRequestHaul] = useMutation(DELETE_REQUEST_HAUL, {
    onCompleted: () => navigate("/requests"),
    refetchQueries: [{ query: GET_REQUEST_HAULS }],
  });

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handlePopup = () => {
    deleteRequestHaul({
      variables: {
        id: parseInt(id),
      },
      onCompleted: () => navigate("/"),
    });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center primary-height">
        <Spinner animation="border" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger">Error fetching hauls: {error.message}</Alert>
    );

  const request = data?.getRequestHaulById;

  return (
    <div className="bg-body-secondary vh-100">
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">M</span>y{" "}
        <span className="primary-color">R</span>equest
      </h2>
      <Row className="justify-content-center mx-0 ">
        <Col md={8}>
          <ListGroup>
            {request ? (
              <ListGroup.Item
                key={request.id}
                className="my-3 border-2 px-4 py-3"
              >
                <h5 className="text-center text-secondary mt-4">
                  {request.origin} - {request.destination}
                </h5>
                <Row className="mt-5 mx-3">
                  <Col md={6}>
                    <div>
                      <p>
                        <span className="semi-bold">Origin: </span>
                        <span className="text-secondary semi-bold">
                          {request.origin}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Destination: </span>
                        <span className="text-secondary semi-bold">
                          {request.destination}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Date: </span>
                        <span className="text-secondary semi-bold">
                          {request.date}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Time: </span>
                        <span className="text-secondary semi-bold">
                          {request.time}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Driver Name: </span>
                        <span className="text-secondary semi-bold">
                          {request.driverName}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Driver ID: </span>
                        <span className="text-secondary semi-bold">
                          {request.driverId}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Vehicle Capacity: </span>
                        <span className="text-secondary semi-bold">
                          {request.vehicleCapacity}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Vehicle Dimension: </span>
                        <span className="text-secondary semi-bold">
                          {request.vehicleDimension}
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <p>
                        <span className="semi-bold">Vehicle Type: </span>
                        <span className="text-secondary semi-bold">
                          {request.vehicleType}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Shared: </span>
                        <span className="text-secondary semi-bold">
                          {request.shared ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Seat: </span>
                        <span className="text-secondary semi-bold">
                          {request.seat ? "Yes" : "No"}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Budget: </span>
                        <span className="text-secondary semi-bold">
                          {request.budget}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">
                          Vehicle Plate Number:{" "}
                        </span>
                        <span className="text-secondary semi-bold">
                          {request.vehiclePlateNumber}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Created: </span>
                        <span className="text-secondary semi-bold">
                          {request.created}
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-center mt-3">
                      <p
                        className="btn btn-danger margin-left"
                        onClick={() => setShowModal(true)}
                      >
                        Delete
                      </p>
                    </div>
                  </Col>
                </Row>
                <p className="text-end my-0 semi-bold text-secondary">
                  {request.created}
                </p>
              </ListGroup.Item>
            ) : (
              <p className="text-center">No request posts available.</p>
            )}
          </ListGroup>
        </Col>
      </Row>
      {showModal ? (
        <ModalPopup
          show={showModal}
          closebutton={true}
          submitButtonName="Delete"
          handleClose={handleClose}
          handlePopup={handlePopup}
          body="Are you sure you want to delete this item?"
        />
      ) : null}
    </div>
  );
};

export default TripRequest;
