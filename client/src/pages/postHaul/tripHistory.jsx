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
import { GET_POSTHAULS } from "../../services/graphql/haulPost";
import { convertTo12HourFormat, sliceAfterFourWords } from "../../utils/utils";

const TripHistory = () => {
  const { loading, error, data } = useQuery(GET_POSTHAULS);

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
    <Container>
      <h2 className="text-center secondary-color my-4 ">
        <span className="primary-color">H</span>aul{" "}
        <span className="primary-color">P</span>
        osts
      </h2>
      <Row className="justify-content-center">
        <Col md={9}>
          <ListGroup>
            {data?.getHaulPosts?.length !== 0 ? (
              data?.getHaulPosts?.map((haul) => (
                <ListGroup.Item key={haul.id} className="primary-bordercolor">
                  <h5 className="text-center my-4 primary-color">
                    {sliceAfterFourWords(haul.origin)} ➡️{" "}
                    {sliceAfterFourWords(haul.destination)}
                  </h5>

                  <Row className="mx-3">
                    <Col md={7} className="mx-5">
                      <p>
                        <span className="fw-bold secondary-color ">
                          Date & Time :
                        </span>{" "}
                        {haul.date} : {convertTo12HourFormat(haul.time)}
                      </p>
                      <p>
                        <span className="fw-bold secondary-color">
                          Vehicle Type :
                        </span>{" "}
                        {haul.vehicleType}
                      </p>
                    </Col>
                    <Col md={3} className="mx-">
                      <p>
                        <span className="fw-bold secondary-color">
                          Shared :
                        </span>{" "}
                        {haul.shared ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="fw-bold secondary-color">Seat :</span>{" "}
                        {haul.seat ? "Yes" : "No"}
                      </p>
                    </Col>
                  </Row>
                  <p className="text-end secondary-color">{haul.created}</p>
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
    </Container>
  );
};

export default TripHistory;
