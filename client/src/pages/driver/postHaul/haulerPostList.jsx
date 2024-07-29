import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Card } from "react-bootstrap";
import { haulInfo } from "../../../utils/utils";
import { useMutation, useQuery } from "@apollo/client";
import Dummy from "../../../utils/pics/user.jpg";
import {
  DELETE_POSTHAULER,
  GET_HAULERS_POSTS,
} from "../../../services/graphql/hauler/haulerPost";
import ModalPopup from "../../../components/Popup.jsx";

const HaulerPostList = () => {
  const { data } = useQuery(GET_HAULERS_POSTS);
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
    DELETE_POSTHAULER,
    {
      refetchQueries: [{ query: GET_HAULERS_POSTS }],
      onCompleted: () => handleClose(),
    }
  );

  // useEffect(() => {
  //   fetchRandomProfilePics();
  // }, []);

  // const fetchRandomProfilePics = () => {
  //   Promise.all(
  //     haulInfo.map((haul) =>
  //       fetch("https://randomuser.me/api/")
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }
  //           return response.json();
  //         })
  //         .then((data) => data.results[0].picture.large)
  //         .catch((error) => {
  //           console.error(
  //             "There was a problem fetching the profile picture:",
  //             error
  //           );
  //           return null;
  //         })
  //     )
  //   )
  //     .then((pics) => {
  //       setRandomProfilePics(pics);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There was a problem fetching profile pictures for all items:",
  //         error
  //       );
  //     });
  // };

  return (
    <div className="bg-body-secondary vh-100">
      <h2 className="text-center secondary-color py-4">
        <span className="primary-color">H</span>aulers{" "}
        <span className="primary-color">P</span>
        osts
      </h2>
      <Row className="justify-content-center mx-0 ">
        <Col md={9}>
          <ListGroup>
            {data?.getHaulerPosts?.length !== 0 ? (
              data?.getHaulerPosts?.map((haul, index) => (
                <ListGroup.Item
                  key={haul.driverId}
                  className="my-3 border-2 px-4 py-3"
                >
                  <Card>
                    <Row className="p-3">
                      <Col sm={4} md={2} className="d-flex align-items-center">
                        {/* {randomProfilePics[index] && ( */}
                        <Card.Img variant="top" src={Dummy} alt="User" />
                        {/* )} */}
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title className="secondary-color mb-3">
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
                              <span className="semi-bold">Budget :</span>{" "}
                              <span className="text-secondary semi-bold">
                                {haul.budget}
                              </span>
                            </p>
                          </Card.Text>
                        </Card.Body>
                      </Col>
                      <Col className="d-flex align-items-center">
                        <div className=" d-flex justify-align-content-between mt-3">
                          <a
                            href={`/hauler/${haul.id}`}
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

export default HaulerPostList;
