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
} from "../../../services/graphql/user/haulPost.js";
import { convertTo12HourFormat, getCoordinates } from "../../../utils/utils.js";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../../../components/map.jsx";
import ItemList from "../../../components/itemList.jsx";
import ModalPopup from "../../../components/Popup.jsx";
import {
  DELETE_POSTHAULER,
  GET_POSTHAULER_BY_ID,
} from "../../../services/graphql/hauler/haulerPost.js";

const HaulerTripHistory = () => {
  const navigate = useNavigate();
  const [viewItems, setViewItems] = useState(false);
  const [origin, setOrigin] = useState({ lat: "", lng: "" });
  const [destination, setDestination] = useState({ lat: "", lng: "" });
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handlePopup = () => {
    removeHaulerPost({
      variables: {
        id: parseInt(id),
      },
      onCompleted: () => navigate("/hauler"),
    });
  };

  const { loading, error, data } = useQuery(GET_POSTHAULER_BY_ID, {
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

  const haul = data?.getHaulerPostByID;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (data) {
          setOrigin(await getCoordinates(data?.getHaulerPostByID?.origin));
          setDestination(
            await getCoordinates(data?.getHaulerPostByID?.destination)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCoordinates();
  }, [data]);

  const [removeHaulerPost, { error: deleteError }] = useMutation(
    DELETE_POSTHAULER,
    {
      refetchQueries: [{ query: GET_POSTHAULS }],
      onCompleted: () => handleClose(),
    }
  );

  return (
    <Container className="mt-3">
      {error ? <Error /> : null}
      {loading ? <Loading /> : null}
      <Row className="justify-content-center">
        <h3 className="text-center secondary-color">
          <span className="primary-color">T</span>rip{" "}
          <span className="primary-color">D</span>
          etails
        </h3>
        <Col md={12}>
          <ListGroup className="d-flex justify-content-center ">
            {haul && (
              <ListGroup.Item key={haul.id} className="border-0">
                <div>
                  <Row className="mx-3  ">
                    <div className=" d-flex justify-content-end ">
                      <p
                        className="btn btn-danger"
                        onClick={() => setShowModal(true)}
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
                        {haul?.date}
                      </p>
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
    </Container>
  );
};

export default HaulerTripHistory;
