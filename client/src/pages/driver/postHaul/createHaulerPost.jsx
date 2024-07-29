import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
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
import { GET_HAULER_INFO } from "../../../services/graphql/auth/auth.js";

const CreateHaulerPost = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { loading, error: haulError, data } = useQuery(GET_HAULER_INFO);

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
    budget: Yup.number().required("Budget is required"),

    driverName: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      budget: "",
      origin: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema,
    onSubmit: (values) => {
      if (data?.getHaulerInfo) {
        createHaulPost({
          variables: {
            haulerPost: {
              ...values,
              driverName: data?.getHaulerInfo?.name,
              driverId: data?.getHaulerInfo?.id,
              vehicleCapacity: data?.getHaulerInfo?.vehicleCapacity,
              vehicleDimension: data?.getHaulerInfo?.vehicleDimension,
              vehiclePlateNumber: data?.getHaulerInfo?.vehiclePlateNumber,
              vehicleType: data?.getHaulerInfo?.vehicleType,
              budget: formik.values.budget.toString(),
            },
          },
        });
      }
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
