import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { getMinimumDate, vehicleTypes } from "../../../utils/utils";
import VehicleTypeSelect from "../../../components/vehicleTypeSelect";
import LocationTypeahead from "../../../components/locationTypeahead";
import FormControl from "../../../components/formControl";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { GET_POSTHAULS } from "../../../services/graphql/haulPost";
import { CREATE_REQUEST_HAUL } from "../../../services/graphql/haulRequest";

const FindTrip = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    origin: Yup.string().required("Origin is required"),
    destination: Yup.string().required("Destination is required"),
    date: Yup.date()
      .required("Date is required")
      .min(getMinimumDate(), "Date cannot be in the past"),
    vehicleType: Yup.string().required("Vehicle Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
      vehicleType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    formik.setFieldValue("date", currentDate);
  }, []);

  const handleSearch = () => {
    navigate("/drivers");
  };

  return (
    <Container className="py-5 ">
      <Row className="justify-content-center">
        <Col md={5} className=" border rounded px-5 pt-5 pb-4">
          <h4 className="mb-4 secondary-color">Find Haul</h4>
          <Form onSubmit={formik.handleSubmit}>
            <LocationTypeahead formik={formik} label="Origin" id="origin" />
            <LocationTypeahead
              formik={formik}
              label="Destination"
              id="destination"
            />

            <FormControl formik={formik} name="date" type="date" label="Date" />

            <VehicleTypeSelect formik={formik} vehicleTypes={vehicleTypes} />

            <Button
              variant="primary"
              type="submit"
              className="primary-bgcolor mb-4"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FindTrip;