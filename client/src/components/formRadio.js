// components/FormRadio.js
import React from "react";
import { Form } from "react-bootstrap";

const FormRadio = ({ formik, label, name, options }) => {
  return (
    <Form.Group controlId={`form${name}`} className="mb-3">
      <Form.Label className="semi-bold text-secondary">
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <div>
        {options.map((option) => (
          <Form.Check
            key={option.value}
            inline
            type="radio"
            label={option.label}
            name={name}
            value={option.value}
            checked={formik.values[name] === option.value}
            onChange={() => formik.setFieldValue(name, option.value)}
            onBlur={formik.handleBlur}
          />
        ))}
        {formik.touched[name] && formik.errors[name] && (
          <div className="text-danger">{formik.errors[name]}</div>
        )}
      </div>
    </Form.Group>
  );
};

export default FormRadio;
