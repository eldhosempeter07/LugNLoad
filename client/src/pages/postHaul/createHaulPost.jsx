import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import {
  CREATE_HAUL_POST,
  GET_POSTHAULS,
} from "../../services/graphql/haulPost";
import { getMinimumDate, getMinimumTime } from "../../utils/utils";

const CreateHaulPost = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    vehicleType: "",
    shared: false,
    seat: false,
    message: "",
  });

  const [createHaulPost, { error }] = useMutation(CREATE_HAUL_POST, {
    refetchQueries: [{ query: GET_POSTHAULS }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "true" ? true : value === "false" ? false : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createHaulPost({
      variables: {
        haulPost: formData,
      },
    });
  };

  useEffect(() => {
    // Set minimum date as current date
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
    }));

    // Set time as 8 hours prior to current time
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 8);
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    setFormData((prevData) => ({
      ...prevData,
      time: formattedTime,
    }));
  }, []);

  return (
    <Container>
      <Alert variant="danger"> {error.message}</Alert>
      <h2 className="text-center secondary-color my-4 ">
        <span className="primary-color">C</span>reate{" "}
        <span className="primary-color">P</span>
        osts
      </h2>{" "}
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOrigin" className="mb-3">
              <Form.Label>
                Origin <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDestination" className="mb-3">
              <Form.Label>
                Destination <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>
                Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                min={getMinimumDate()}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>
                Time <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                min={getMinimumTime()}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formVehicleType" className="mb-3">
              <Form.Label>
                Vehicle Type <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formShared" className="mb-3">
              <Form.Label>
                Shared <span className="text-danger">*</span>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="shared"
                  value="true"
                  checked={formData.shared === true}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="shared"
                  value="false"
                  checked={formData.shared === false}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formSeat" className="mb-3">
              <Form.Label>
                Seat <span className="text-danger">*</span>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  name="seat"
                  value="true"
                  checked={formData.seat === true}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  name="seat"
                  value="false"
                  checked={formData.seat === false}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="primary-bgcolor mb-4"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateHaulPost;
