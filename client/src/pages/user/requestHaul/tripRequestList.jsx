import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  DELETE_REQUEST_HAUL,
  GET_REQUEST_HAULS,
} from "../../../services/graphql/haulRequest";
import ModalPopup from "../../../components/Popup.tsx";

const TripRequestList = () => {
  const { loading, error, data } = useQuery(GET_REQUEST_HAULS);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(false);

  const [deleteRequestHaul, { error: deleteError }] = useMutation(
    DELETE_REQUEST_HAUL,
    {
      refetchQueries: [{ query: GET_REQUEST_HAULS }],
      onCompleted: () => handleClose(),
    }
  );

  const handleClose = () => setShowModal(false);

  const handlePopup = () => {
    deleteRequestHaul({
      variables: {
        id: parseInt(id),
      },
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

  return (
    <div
      className={`bg-body-secondary ${
        data?.getRequestHauls?.length < 2 ? "vh-100" : null
      }  `}
    >
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">M</span>y{" "}
        <span className="primary-color">R</span>equests
      </h2>
      <Row className="justify-content-center mx-0 ">
        <Col md={8}>
          <ListGroup>
            {data?.getRequestHauls?.length !== 0 ? (
              data?.getRequestHauls?.map((haul) => (
                <ListGroup.Item key={haul.id} className="my-3 px-4 py-3">
                  <Row className="mt-3 border py-4 my-2 mx-2 px-2">
                    <Col md={5}>
                      <div>
                        <p>
                          <span className="semi-bold">Origin: </span>
                          <span className="text-secondary semi-bold">
                            {haul.origin}
                          </span>
                        </p>
                        <p>
                          <span className="semi-bold">Destination: </span>
                          <span className="text-secondary semi-bold">
                            {haul.destination}
                          </span>
                        </p>
                        <p>
                          <span className="semi-bold">Seat: </span>
                          <span className="text-secondary semi-bold ">
                            {haul.seat ? "Yes" : "No"}
                          </span>
                          <span className="semi-bold  margin-left">
                            Shared:{" "}
                          </span>
                          <span className="text-secondary semi-bold">
                            {haul.shared ? "Yes" : "No"}
                          </span>
                        </p>
                        <p></p>
                        <p>
                          <span className="semi-bold">Vehicle Type: </span>
                          <span className="text-secondary semi-bold">
                            {haul.vehicleType}
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <h6 className="mt-3">{haul.date}</h6>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <h6 className="mt-3">{haul.time}</h6>
                    </Col>
                    {/* Include other fields similarly */}
                    <Col className="d-flex align-items-center">
                      <div className=" d-flex justify-align-content-between mt-3">
                        <Link
                          to={`/requests/${haul.id}`}
                          className="my-2 text-dark text-decoration-none "
                        >
                          View
                        </Link>
                        <p
                          className="btn btn-danger margin-left"
                          onClick={() => {
                            setShowModal(true);
                            setId(haul.id);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    </Col>
                    <p className="text-end my-0 semi-bold text-secondary">
                      {haul.created}
                    </p>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center">No haul Posts available.</p>
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
          body="Are you sure you want to delete this request?"
        />
      ) : null}
    </div>
  );
};

export default TripRequestList;
