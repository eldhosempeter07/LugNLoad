import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  DELETE_POSTHAUL,
  GET_POSTHAULS,
} from "../../../services/graphql/haulPost";
import {
  convertTo12HourFormat,
  sliceAfterFourWords,
} from "../../../utils/utils";
import ModalPopup from "../../../components/Popup.tsx";

const TripHistoryList = () => {
  const { loading, error, data } = useQuery(GET_POSTHAULS);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(false);

  const handleClose = () => setShowModal(false);

  const handlePopup = () => {
    removeHaulPost({
      variables: {
        id: parseInt(id),
      },
    });
  };
  const [removeHaulPost, { error: deleteError }] = useMutation(
    DELETE_POSTHAUL,
    {
      refetchQueries: [{ query: GET_POSTHAULS }],
      onCompleted: () => handleClose(),
    }
  );

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
        data?.getHaulPosts?.length < 2 ? "vh-100" : null
      }  `}
    >
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">M</span>y{" "}
        <span className="primary-color">P</span>
        osts
      </h2>
      <Row className="justify-content-center mx-0 ">
        <Col md={9}>
          <ListGroup>
            {data?.getHaulPosts?.length !== 0 ? (
              data?.getHaulPosts?.map((haul) => (
                <ListGroup.Item key={haul.id} className="my-3  px-4 py-3">
                  <Row className="mt-3 border py-4 my-3 mx-2 px-2">
                    <Col md={5}>
                      <p>
                        <span className="semi-bold">Route : </span>
                        <span className="text-secondary semi-bold">
                          {sliceAfterFourWords(haul.origin)}
                          ➡️
                          {sliceAfterFourWords(haul.destination)}
                        </span>
                      </p>

                      <p>
                        <span className="semi-bold">Vehicle Type :</span>{" "}
                        <span className="text-secondary semi-bold">
                          {haul.vehicleType}
                        </span>
                      </p>
                      <p>
                        <span className="semi-bold">Shared :</span>{" "}
                        <span className="text-secondary semi-bold">
                          {haul.shared ? "Yes" : "No"}
                        </span>
                        <span className="semi-bold margin-left ">Seat :</span>{" "}
                        <span className="text-secondary semi-bold">
                          {haul.seat ? "Yes" : "No"}{" "}
                        </span>
                      </p>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <h6 className="mt-3">{haul.date}</h6>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <h6 className="mt-3">
                        {convertTo12HourFormat(haul.time)}
                      </h6>
                    </Col>
                    <Col className="d-flex align-items-center">
                      <div className=" d-flex justify-align-content-between mt-3">
                        <a
                          href={`/haul/${haul.id}`}
                          className="my-2 text-dark text-decoration-none "
                        >
                          View
                        </a>
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
              <p className="text-center">
                {" "}
                <p>No haul Posts available.</p>
              </p>
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
          body="Are you sure you want to delete this post?"
        />
      ) : null}
    </div>
  );
};

export default TripHistoryList;