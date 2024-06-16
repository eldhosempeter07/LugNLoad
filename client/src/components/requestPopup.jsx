import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const RequestPopup = ({ show, handleClose, handleSave }) => {
  const initialValues = {
    time: "",
    message: "",
    budget: "",
    shared: false,
    seat: false,
  };

  const validationSchema = Yup.object({
    time: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
    budget: Yup.number().required("Required").min(0, "Budget must be positive"),
    shared: Yup.boolean().required("Required"),
    seat: Yup.boolean().required("Required"),
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
              <Form.Group controlId="time">
                <Form.Label className="semi-bold text-secondary">
                  Time
                </Form.Label>
                <Field
                  name="time"
                  type="time"
                  as={Form.Control}
                  value={values.time}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
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
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group controlId="budget" className="my-3">
                <Form.Label className="semi-bold text-secondary">
                  Budget
                </Form.Label>
                <Field
                  name="budget"
                  type="number"
                  as={Form.Control}
                  value={values.budget}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="budget"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group controlId="shared" className="my-3">
                <Form.Label className="semi-bold text-secondary">
                  Shared
                </Form.Label>
                <div>
                  <Field
                    name="shared"
                    type="radio"
                    value="true"
                    as={Form.Check}
                    checked={values.shared === true}
                    onChange={() =>
                      handleChange({ target: { name: "shared", value: true } })
                    }
                    label="Yes"
                  />
                  <Field
                    name="shared"
                    type="radio"
                    value="false"
                    as={Form.Check}
                    checked={values.shared === false}
                    onChange={() =>
                      handleChange({ target: { name: "shared", value: false } })
                    }
                    label="No"
                  />
                </div>
                <ErrorMessage
                  name="shared"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              <Form.Group controlId="seat" className="my-3">
                <Form.Label className="semi-bold text-secondary">
                  Seat
                </Form.Label>
                <div>
                  <Field
                    name="seat"
                    type="radio"
                    value="true"
                    as={Form.Check}
                    checked={values.seat === true}
                    onChange={() =>
                      handleChange({ target: { name: "seat", value: true } })
                    }
                    label="Yes"
                  />
                  <Field
                    name="seat"
                    type="radio"
                    value="false"
                    as={Form.Check}
                    checked={values.seat === false}
                    onChange={() =>
                      handleChange({ target: { name: "seat", value: false } })
                    }
                    label="No"
                  />
                </div>
                <ErrorMessage
                  name="seat"
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

export default RequestPopup;
