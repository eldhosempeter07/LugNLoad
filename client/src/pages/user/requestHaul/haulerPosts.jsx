import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Card } from "react-bootstrap";
import { haulInfo } from "../../../utils/utils";
import RequestPopup from "../../../components/requestPopup";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_REQUEST_HAUL,
  GET_REQUEST_HAULS,
} from "../../../services/graphql/user/haulRequest";
import { useNavigate } from "react-router-dom";
import {
  GET_HAULERS_POSTS,
  GET_POSTHAULER_BY_ID,
} from "../../../services/graphql/hauler/haulerPost";
import Dummy from "../../../utils/pics/user.jpg";

const HaulersPosts = () => {
  const { data } = useQuery(GET_HAULERS_POSTS);
  const [id, setId] = useState(null);
  const { data: haulerData } = useQuery(GET_POSTHAULER_BY_ID, {
    variables: { id },
  });

  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [randomProfilePics, setRandomProfilePics] = useState([]);

  const [createRequestHaul] = useMutation(CREATE_REQUEST_HAUL, {
    refetchQueries: [{ query: GET_REQUEST_HAULS }],
    onCompleted: () => navigate("/requests"),
  });

  const handleSave = (formData) => {
    const {
      origin,
      destination,
      driverName,
      driverId,
      vehicleCapacity,
      vehicleDimension,
      vehicleType,
      vehiclePlateNumber,
      date,
    } = haulerData?.getHaulerPostByID;
    createRequestHaul({
      variables: {
        haul: {
          origin,
          destination,
          driverName,
          driverId,
          vehicleCapacity,
          vehicleDimension,
          vehicleType,
          vehiclePlateNumber,
          date,
          ...formData,
        },
      },
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-body-secondary vh-100 ">
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">H</span>aulers{" "}
      </h2>
      <Row className="justify-content-center mx-0">
        <Col md={9}>
          <ListGroup>
            {data?.getHaulerPosts?.length !== 0 ? (
              data?.getHaulerPosts?.map((haul, index) => (
                <ListGroup.Item
                  key={haul.driver_id}
                  className="my-3 border-2 px-4 py-3"
                >
                  <Card>
                    <Row className="p-3">
                      <Col sm={4} md={2} className="d-flex align-items-center">
                        <Card.Img
                          variant="top"
                          src={Dummy}
                          alt={`Random Profile Pic ${index}`}
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title className="secondary-color">
                            {haul.driverName}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Driver ID: {haul.driverId}
                          </Card.Subtitle>
                          <Card.Text>
                            <p className="my-1">
                              <span className="semi-bold mt-5">Route : </span>
                              <span className="text-secondary semi-bold">
                                {haul.origin} ➡️ {haul.destination}
                              </span>
                            </p>
                            <p className="my-1">
                              <span className="semi-bold">Capacity :</span>{" "}
                              <span className="text-secondary semi-bold">
                                {haul.vehicleCapacity}
                              </span>
                            </p>
                            <p className="my-1">
                              <span className="semi-bold">Vehicle Type :</span>{" "}
                              <span className="text-secondary semi-bold">
                                {haul.vehicleType}
                              </span>
                            </p>
                            <p className="my-1">
                              <span className="semi-bold">Budget :</span>{" "}
                              <span className="text-secondary semi-bold">
                                {haul.budget}
                              </span>
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={2} className="d-flex align-items-center">
                        <p
                          className="btn btn-success "
                          onClick={() => {
                            setId(haul.id);
                            setShowPopup(true);
                          }}
                        >
                          Request
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-center">No hauler Posts available.</p>
            )}
          </ListGroup>
        </Col>
      </Row>
      <RequestPopup
        show={showPopup}
        handleClose={handleClosePopup}
        handleSave={handleSave}
      />
    </div>
  );
};

export default HaulersPosts;
