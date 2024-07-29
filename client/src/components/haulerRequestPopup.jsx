import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const HaulerRequestPopup = ({ show, handleClose, handleSave }) => {
  const initialValues = {
    message: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values) => {
    handleSave(values);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Haul</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <FormikForm>
              <Form.Group controlId="message" className="my-3">
                <Form.Label className="semi-bold text-secondary">
                  Message
                </Form.Label>
                <Field
                  name="message"
                  as={Form.Control}
                  rows={3}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Enter your message here..."
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="primary-bgcolor"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  className="mx-2"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default HaulerRequestPopup;
