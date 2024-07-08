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

  useEffect(() => {
    fetchRandomProfilePics();
  }, []);

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

  const fetchRandomProfilePics = () => {
    Promise.all(
      haulInfo.map(() =>
        fetch("https://randomuser.me/api/")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => data.results[0].picture.large)
          .catch((error) => {
            console.error(
              "There was a problem fetching the profile picture:",
              error
            );
            return null;
          })
      )
    )
      .then((pics) => {
        setRandomProfilePics(pics);
      })
      .catch((error) => {
        console.error(
          "There was a problem fetching profile pictures for all items:",
          error
        );
      });
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
                        {randomProfilePics[index] && (
                          <Card.Img
                            variant="top"
                            src={randomProfilePics[index]}
                            alt={`Random Profile Pic ${index}`}
                          />
                        )}
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title className="secondary-color">
                            {haul.name}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            Driver ID: {haul.driver_id}
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
                                {haul.capacity}
                              </span>
                            </p>
                            <p className="my-1">
                              <span className="semi-bold">Vehicle Type :</span>{" "}
                              <span className="text-secondary semi-bold">
                                {haul.vehicle_type}
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
              <p className="text-center">No haul Posts available.</p>
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
