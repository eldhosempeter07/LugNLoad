import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_HAULER } from "../../../services/graphql/auth/auth";
import { Container } from "react-bootstrap";
import VehicleTypeSelect from "../../../components/vehicleTypeSelect";
import { vehicleTypes } from "../../../utils/utils";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define the validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Re-entering password is required"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  license: Yup.string().required("License is required"),
  vehicleDimension: Yup.string().required("Vehicle Dimension is required"),
  vehicleCapacity: Yup.number()
    .required("Vehicle Capacity is required")
    .positive("Vehicle Capacity must be positive"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  vehiclePlateNumber: Yup.string().required("Vehicle Plate Number is required"),
});

const HaulerRegister = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");

  const [createHauler] = useMutation(CREATE_HAULER, {
    onCompleted: () => navigate("/hauler-login"),
    onError: (error) => setValidationError(error.message),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repassword: "",
      name: "",
      phone: "",
      address: "",
      license: "",
      vehicleDimension: "",
      vehicleCapacity: "",
      vehicleType: "",
      vehiclePlateNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setValidationError("");
      createHauler({
        variables: {
          hauler: {
            password: values.password,
            email: values.email,
            name: values.name,
            phone: values.phone,
            address: values.address,
            license: values.license,
            vehicleDimension: values.vehicleDimension,
            vehicleCapacity: parseFloat(values.vehicleCapacity),
            vehicleType: values.vehicleType,
            vehiclePlateNumber: values.vehiclePlateNumber,
          },
        },
      });
    },
  });

  return (
    <Container className="auth-container">
      <h4 className="text-primary text-center mt-5 text-uppercase">Register</h4>
      <div className="register-form mx-auto mt-4 p-4 border rounded shadow">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-danger">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              type="text"
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-danger">{formik.errors.address}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">License</label>
            <input
              className="form-control"
              type="text"
              name="license"
              placeholder="License"
              value={formik.values.license}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.license && formik.errors.license ? (
              <div className="text-danger">{formik.errors.license}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle Dimension</label>
            <input
              className="form-control"
              type="text"
              name="vehicleDimension"
              placeholder="Vehicle Dimension"
              value={formik.values.vehicleDimension}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.vehicleDimension &&
            formik.errors.vehicleDimension ? (
              <div className="text-danger">
                {formik.errors.vehicleDimension}
              </div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle Capacity</label>
            <input
              className="form-control"
              type="number"
              step="any"
              name="vehicleCapacity"
              placeholder="Vehicle Capacity"
              value={formik.values.vehicleCapacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.vehicleCapacity && formik.errors.vehicleCapacity ? (
              <div className="text-danger">{formik.errors.vehicleCapacity}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <VehicleTypeSelect formik={formik} vehicleTypes={vehicleTypes} />
          </div>
          <div className="mb-3">
            <label className="form-label">Vehicle Plate Number</label>
            <input
              className="form-control"
              type="text"
              name="vehiclePlateNumber"
              placeholder="Vehicle Plate Number"
              value={formik.values.vehiclePlateNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.vehiclePlateNumber &&
            formik.errors.vehiclePlateNumber ? (
              <div className="text-danger">
                {formik.errors.vehiclePlateNumber}
              </div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Re-Enter Password</label>
            <input
              className="form-control"
              type="password"
              name="repassword"
              placeholder="Re-Enter Password"
              value={formik.values.repassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.repassword && formik.errors.repassword ? (
              <div className="text-danger">{formik.errors.repassword}</div>
            ) : null}
          </div>
          {validationError && (
            <p className="text-danger text-center">{validationError}</p>
          )}
          <div className="text-center mb-3">
            <Link to="/login" className="btn btn-link">
              Already have an account? Login
            </Link>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default HaulerRegister;
