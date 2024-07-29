import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ListGroup, Row, Col, Spinner, Alert } from "react-bootstrap";
import {
  GET_POSTHAULS,
  GET_POSTHAUL_BY_ID,
} from "../../../services/graphql/user/haulPost.js";
import {
  convertTo12HourFormat,
  sliceAfterFourWords,
} from "../../../utils/utils.js";
import ModalPopup from "../../../components/Popup.jsx";
import {
  CREATE_REQUEST_HAULER,
  GET_REQUEST_HAULERS,
} from "../../../services/graphql/hauler/haulerRequest.js";
import HaulerRequestPopup from "../../../components/haulerRequestPopup.jsx";
import { GET_HAULER_INFO } from "../../../services/graphql/auth/auth.js";

const UsersPostList = () => {
  const [createRequestHauler] = useMutation(CREATE_REQUEST_HAULER, {
    refetchQueries: [{ query: GET_REQUEST_HAULERS }],
    onCompleted: () => navigate("/hauler/requests"),
  });
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POSTHAULS);
  const [id, setId] = useState(null);
  const { loading: postHaulerLoading, data: postHaulerData } = useQuery(
    GET_POSTHAUL_BY_ID,
    {
      variables: { id },
    }
  );

  const { error: haulError, data: haulData } = useQuery(GET_HAULER_INFO);

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handelRequest = (formData) => {
    const { origin, destination, date, time } = postHaulerData?.getHaulPostByID;
    createRequestHauler({
      variables: {
        hauler: {
          origin,
          destination,
          date,
          time,
          name: haulData?.getHaulerInfo?.name,
          ...formData,
        },
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
    <div className="bg-body-secondary vh-100">
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">H</span>auls{" "}
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
                        <p
                          className="btn btn-success margin-left"
                          onClick={() => {
                            setId(haul.id);
                            setShowPopup(true);
                          }}
                        >
                          Request
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
      <HaulerRequestPopup
        show={showPopup}
        handleClose={handleClosePopup}
        handleSave={handelRequest}
      />
    </div>
  );
};

export default UsersPostList;
