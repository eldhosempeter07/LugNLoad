import React from "react";
import { Form } from "react-bootstrap";

const VehicleTypeSelect = ({ formik, vehicleTypes, disableOptions }) => (
  <Form.Group controlId="formVehicleType" className="my-3">
    <Form.Label className="semi-bold text-secondary">
      Vehicle Type <span className="text-danger">*</span>
    </Form.Label>
    <Form.Control
      as="select"
      name="vehicleType"
      value={formik.values.vehicleType}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <option value="">Select vehicle type</option>
      {vehicleTypes.map((vehicle) => (
        <option
          key={vehicle.type}
          value={vehicle.type}
          disabled={disableOptions?.includes(vehicle.type)}
        >
          {vehicle.type}
        </option>
      ))}
    </Form.Control>
    {formik.touched.vehicleType && formik.errors.vehicleType && (
      <div className="text-danger">{formik.errors.vehicleType}</div>
    )}
  </Form.Group>
);

export default VehicleTypeSelect;
