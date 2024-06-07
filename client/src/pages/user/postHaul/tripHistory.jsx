import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ListGroup,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  DELETE_POSTHAUL,
  GET_POSTHAULS,
  GET_POSTHAUL_BY_ID,
} from "../../../services/graphql/haulPost";
import {
  convertTo12HourFormat,
  getCoordinates,
  sliceAfterFourWords,
} from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../../../components/map";
import ItemList from "../../../components/itemList";

const TripHistory = () => {
  const navigate = useNavigate();
  const [viewItems, setViewItems] = useState(false);
  const [origin, setOrigin] = useState({ lat: "", lng: "" });
  const [destination, setDestination] = useState({ lat: "", lng: "" });
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POSTHAUL_BY_ID, {
    variables: { id: parseInt(id) },
  });

  const Loading = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center primary-height">
          <Spinner animation="border" />
        </div>
      );
    }
  };

  const Error = () => {
    if (error) {
      return (
        <Alert variant="danger">Error fetching hauls: {error.message}</Alert>
      );
    }
  };

  const haul = data?.getHaulPostByID;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (data) {
          setOrigin(await getCoordinates(data?.getHaulPostByID?.origin));
          setDestination(
            await getCoordinates(data?.getHaulPostByID?.destination)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCoordinates();
  }, [data]);

  const [removeHaulPost, { error: deleteError }] = useMutation(
    DELETE_POSTHAUL,
    {
      refetchQueries: [{ query: GET_POSTHAULS }],
      onCompleted: () => navigate("/haul"),
    }
  );

  const handleDelete = (id) => {
    removeHaulPost({
      variables: {
        id: parseInt(id),
      },
    });
  };

  return (
    <Container className="mt-3">
      {error ? <Error /> : null}
      {loading ? <Loading /> : null}
      <Row className="justify-content-center">
        <Col md={12}>
          <ListGroup className="d-flex justify-content-center ">
            {haul && (
              <ListGroup.Item key={haul.id} className="border-0">
                <div>
                  <Row className="mx-3  ">
                    <div className=" d-flex justify-content-end ">
                      <p
                        className="btn btn-danger"
                        onClick={() => handleDelete(haul?.id)}
                      >
                        Delete
                      </p>
                    </div>
                    <Col md={6} className="mt-3">
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Origin
                        </span>
                        {haul.origin}
                      </p>
                      <p className="mt-3 fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Destination
                        </span>
                        {haul.destination}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Date
                        </span>{" "}
                        {haul.date}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Time
                        </span>{" "}
                        {convertTo12HourFormat(haul.time)}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Vehicle Type
                        </span>{" "}
                        {haul.vehicleType}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Shared
                        </span>{" "}
                        {haul.shared ? "Yes" : "No"}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Seat
                        </span>{" "}
                        {haul.seat ? "Yes" : "No"}
                      </p>
                      <p className="fw-bold">
                        <span className="d-block semi-bold text-secondary">
                          Message
                        </span>{" "}
                        {haul.message}
                      </p>
                      <p
                        className="semi-bold text-secondary cursor-pointer text-decoration-underline"
                        onClick={() => setViewItems(!viewItems)}
                      >
                        {viewItems ? "Hide Items" : "View Items"}
                      </p>
                      {viewItems ? <ItemList items={haul?.items} /> : null}
                    </Col>
                    <Col md={6} className="mt-2 semi-bold text-secondary">
                      <p>Location</p>
                      {origin?.lat !== "" &&
                        origin?.lng !== "" &&
                        destination?.lat !== "" &&
                        destination?.lng !== "" && (
                          <Map
                            source={{ lat: origin?.lat, lng: origin?.lng }}
                            destination={{
                              lat: destination?.lat,
                              lng: destination?.lng,
                            }}
                          />
                        )}
                    </Col>
                  </Row>
                </div>
                <p className="text-end text-secondary semi-bold">
                  {haul.created}
                </p>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TripHistory;
