import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ModalPopup from "../../../components/Popup.jsx";
import FormControl from "../../../components/formControl.jsx";
import LocationTypeahead from "../../../components/locationTypeahead.jsx";
import {
  CREATE_HAULER_POST,
  GET_HAULERS_POSTS,
} from "../../../services/graphql/hauler/haulerPost.js";
import VehicleTypeSelect from "../../../components/vehicleTypeSelect.jsx";
import { vehicleTypes } from "../../../utils/utils.js";

const CreateHaulerPost = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handlePopup = () => navigate("/hauler");

  const [createHaulPost, { error }] = useMutation(CREATE_HAULER_POST, {
    refetchQueries: [{ query: GET_HAULERS_POSTS }],
    onCompleted: () => setShowModal(true),
  });

  const validationSchema = Yup.object({
    origin: Yup.string().required("Origin is required"),
    destination: Yup.string().required("Destination is required"),
    date: Yup.date().required("Date is required"),
    vehicleCapacity: Yup.number().required("Vehicle capacity is required"),
    vehicleType: Yup.string().required("Vehicle Type is required"),
    budget: Yup.number().required("Budget is required"),
    vehiclePlateNumber: Yup.string().required(
      "Vehicle Plate Number is required"
    ),
    driverName: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      driverName: "Steve Tom",
      driverId: "23fdf31243",
      vehicleCapacity: 1000,
      vehicleDimension: "8' x 5' x 4'",
      vehicleType: "",
      budget: "",
      vehiclePlateNumber: "DYE2131",
      origin: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema,
    onSubmit: (values) => {
      createHaulPost({
        variables: {
          haulerPost: { ...values, budget: formik.values.budget.toString() },
        },
      });
    },
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    formik.setFieldValue("date", currentDate);
  }, []);

  return (
    <div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={5} className="border rounded px-5 pt-5 pb-4">
            <h4 className="secondary-color mb-4">Create Hauler Post</h4>
            {error && <Alert variant="danger">{error.message}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
              <LocationTypeahead formik={formik} label="Origin" id="origin" />
              <LocationTypeahead
                formik={formik}
                label="Destination"
                id="destination"
              />
              <FormControl
                formik={formik}
                name="date"
                type="date"
                label="Date"
              />
              <VehicleTypeSelect formik={formik} vehicleTypes={vehicleTypes} />
              <FormControl
                formik={formik}
                label="Budget"
                type="number"
                name="budget"
              />
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
      {showModal && (
        <ModalPopup
          show={showModal}
          type="Create"
          closebutton={false}
          submitButtonName="Ok"
          handleClose={handleClose}
          handlePopup={handlePopup}
          body="Post Created Successfully"
        />
      )}
    </div>
  );
};

export default CreateHaulerPost;
