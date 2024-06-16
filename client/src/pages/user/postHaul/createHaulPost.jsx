import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getMinimumDate,
  radioOptions,
  vehicleTypes,
} from "../../../utils/utils";
import ItemList from "../../../components/itemList";
import ItemForm from "../../../components/itemForm";
import VehicleTypeSelect from "../../../components/vehicleTypeSelect";
import LocationTypeahead from "../../../components/locationTypeahead";
import FormControl from "../../../components/formControl";
import FormCheck from "../../../components/formRadio";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  CREATE_HAUL_POST,
  GET_POSTHAULS,
} from "../../../services/graphql/haulPost";
import FormRadio from "../../../components/formRadio";
import ModalPopup from "../../../components/Popup.tsx";

const CreateHaulPost = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const navigate = useNavigate();

  const handlePopup = () => {
    navigate("/");
  };
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    number: 1,
    length: 0,
    width: 0,
    height: 0,
  });
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableOptions, setDisableOptions] = useState([]);

  const [createHaulPost, { error }] = useMutation(CREATE_HAUL_POST, {
    refetchQueries: [{ query: GET_POSTHAULS }],
    onCompleted: () => setShowModal(true),
  });

  const validationSchema = Yup.object({
    origin: Yup.string().required("Origin is required"),
    destination: Yup.string().required("Destination is required"),
    date: Yup.date()
      .required("Date is required")
      .min(getMinimumDate(), "Date cannot be in the past"),
    time: Yup.string().required("Time is required"),
    vehicleType: Yup.string().required("Vehicle Type is required"),
    shared: Yup.boolean().required("Shared is required"),
    seat: Yup.boolean().required("Seat is required"),
    message: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      vehicleType: "",
      shared: false,
      seat: false,
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("as");
      createHaulPost({ variables: { haulPost: { ...values, items } } });
    },
  });

  const addItem = () => {
    const totalDimensions = items.reduce(
      (acc, cur) => ({
        length: acc.length + cur.length,
        width: acc.width + cur.width,
        height: acc.height + cur.height,
      }),
      { length: 0, width: 0, height: 0 }
    );
    const maxDimensions = vehicleTypes[2].maxDimensions;
    if (
      totalDimensions.length + item.length * item.number >
        maxDimensions.length ||
      totalDimensions.width + item.width * item.number > maxDimensions.width ||
      totalDimensions.height + item.height * item.number > maxDimensions.height
    ) {
      return setDisableAdd(true);
    }
    setDisableAdd(false);
    setItems([...items, item]);
    setItem({ name: "", number: 1, length: 0, width: 0, height: 0 });
  };

  const handleItemChange = (field, value) => {
    setItem({ ...item, [field]: value });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    formik.setFieldValue("date", currentDate);

    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours());
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    formik.setFieldValue("time", formattedTime);
  }, []);

  useEffect(() => {
    const disabledVechicles = vehicleTypes
      .filter((vehicle) => {
        const totalDimensions = items.reduce(
          (acc, cur) => ({
            length: acc.length + cur.length * cur.number,
            width: acc.width + cur.width * cur.number,
            height: acc.height + cur.height * cur.number,
          }),
          { length: 0, width: 0, height: 0 }
        );
        const maxDimensions = vehicle.maxDimensions;
        return (
          totalDimensions.length > maxDimensions.length ||
          totalDimensions.width > maxDimensions.width ||
          totalDimensions.height > maxDimensions.height
        );
      })
      .map((vehicle) => vehicle.type);
    setDisableOptions(disabledVechicles);
  }, [items]);

  return (
    <div>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={5} className="border rounded px-5 pt-5 pb-4">
            <h4 className="secondary-color mb-4">Create Haul Post</h4>
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
                name="time"
                type="time"
                label="Time"
              />
              <h6 className="text-secondary">Items</h6>
              <ItemList items={items} />

              <ItemForm
                item={item}
                handleItemChange={handleItemChange}
                addItem={addItem}
                disableAdd={disableAdd}
              />

              <VehicleTypeSelect
                formik={formik}
                vehicleTypes={vehicleTypes}
                disableOptions={disableOptions}
              />
              <FormRadio
                formik={formik}
                label="Shared"
                name="shared"
                options={radioOptions}
              />
              <FormCheck
                formik={formik}
                name="seat"
                label="Seat"
                options={radioOptions}
              />
              <FormControl
                formik={formik}
                name="message"
                type="textarea"
                label="Message"
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
      {showModal ? (
        <ModalPopup
          show={showModal}
          closebutton={false}
          submitButtonName="Ok"
          handleClose={handleClose}
          handlePopup={handlePopup}
          body="Post Created Sucessfully"
        />
      ) : null}
    </div>
  );
};

export default CreateHaulPost;
