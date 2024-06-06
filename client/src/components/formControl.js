// components/FormControl.js
import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ formik, name, type, label }) => {
  return (
    <Form.Group controlId={`form${name}`} className="mb-3">
      <Form.Label className="semi-bold text-secondary">
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[name] && formik.errors[name]}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Form.Control.Feedback type="invalid">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default FormControl;
