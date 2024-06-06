// components/LocationTypeahead.js
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";

const LocationTypeahead = ({ formik, label, id }) => {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              q: query,
              key: process.env.REACT_APP_OPENCAGE_API_KEY,
              countrycode: "CA",
            },
          }
        );
        const filteredOptions = response.data.results
          .filter((result) => result.components.state_code === "ON")
          .map((result) => result.formatted);
        setOptions(filteredOptions);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
  };

  const handleSelect = (selected) => {
    if (selected.length > 0) {
      formik.setFieldValue(id, selected[0]);
    }
  };

  return (
    <Form.Group controlId={`form${id}`} className="mb-3">
      <Form.Label className="semi-bold text-secondary">
        {label} <span className="text-danger">*</span>
      </Form.Label>
      <Typeahead
        id={id}
        options={options}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        onBlur={formik.handleBlur}
        selected={formik.values[id] ? [formik.values[id]] : []}
        isInvalid={formik.touched[id] && !!formik.errors[id]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[id]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default LocationTypeahead;
