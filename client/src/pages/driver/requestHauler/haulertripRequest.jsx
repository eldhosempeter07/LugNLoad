import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalPopup from "../../../components/Popup.jsx";
import {
  DELETE_REQUEST_HAULER,
  GET_REQUEST_HAULER_BY_ID,
  GET_REQUEST_HAULERS,
} from "../../../services/graphql/hauler/haulerRequest.js";

const HaulerTripRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REQUEST_HAULER_BY_ID, {
    variables: { id: parseInt(id) },
  });

  const [deleteRequestHauler] = useMutation(DELETE_REQUEST_HAULER, {
    refetchQueries: [{ query: GET_REQUEST_HAULERS }],
  });

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handlePopup = () => {
    deleteRequestHauler({
      variables: {
        id: parseInt(id),
      },
      onCompleted: () => navigate("/hauler/requests"),
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

  const request = data?.getRequestHaulerById;

  return (
    <div className="bg-body-secondary vh-100">
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">M</span>y{" "}
        <span className="primary-color">R</span>equest
      </h2>
      <Row className="justify-content-center mx-0 px-3 ">
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
                <div className="px-3 mt-4">
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
                    <span className="semi-bold">Message: </span>
                    <span className="text-secondary semi-bold">
                      {request.message}
                    </span>
                  </p>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <p
                    className="btn btn-danger margin-left"
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </p>
                </div>
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

export default HaulerTripRequest;
