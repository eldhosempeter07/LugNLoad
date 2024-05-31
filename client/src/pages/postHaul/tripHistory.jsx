import React from "react";
import { useQuery } from "@apollo/client";
import {
  ListGroup,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { GET_POSTHAUL_BY_ID } from "../../services/graphql/haulPost"; // Import the query for fetching haul post by ID
import { convertTo12HourFormat, sliceAfterFourWords } from "../../utils/utils";

const TripHistory = () => {
  const id = 30193;
  const { loading, error, data } = useQuery(GET_POSTHAUL_BY_ID, {
    variables: { id: id },
  });

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

  const haul = data.getHaulPostByID;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={7}>
          <ListGroup className="d-flex justify-content-center align-items-center">
            {haul && ( // Check if haul exists
              <ListGroup.Item key={haul.id} className="primary-bordercolor">
                <h5 className="text-center my-4 primary-color">
                  <p>{sliceAfterFourWords(haul.origin)}</p>
                  ⬇️
                  <p className="mt-3">
                    {sliceAfterFourWords(haul.destination)}
                  </p>
                </h5>
                <div>
                  <Row className="mx-3 text-center ">
                    <p>
                      <span className="fw-bold secondary-color ">Date :</span>{" "}
                      {haul.date}
                    </p>
                    <p>
                      <span className="fw-bold secondary-color ">Time :</span>{" "}
                      {convertTo12HourFormat(haul.time)}
                    </p>
                    <p>
                      <span className="fw-bold secondary-color">
                        Vehicle Type :
                      </span>{" "}
                      {haul.vehicleType}
                    </p>
                    <p>
                      <span className="fw-bold secondary-color">Shared :</span>{" "}
                      {haul.shared ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="fw-bold secondary-color">Seat :</span>{" "}
                      {haul.seat ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="fw-bold secondary-color">Message :</span>{" "}
                      {haul.message}
                    </p>
                  </Row>
                </div>
                <p className="text-end secondary-color">{haul.created}</p>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TripHistory;
