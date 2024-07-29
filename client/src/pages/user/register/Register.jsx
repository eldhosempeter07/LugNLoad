import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../../services/graphql/auth/auth";
import { Container } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => navigate("/login"),
    onError: (error) => setValidationError(error.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setValidationError("All fields are required");
    }
    if (password !== repassword) {
      return setValidationError("Passwords must match");
    }
    setValidationError("");
    registerUser({
      variables: { user: { password, email } }, // Updated mutation variables
    });
  };

  return (
    <Container className="auth-container">
      <h4 className="text-primary text-center mt-5 text-uppercase">Register</h4>
      <div className="register-form mx-auto mt-4 p-4 border rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Re-Enter Password</label>
            <input
              className="form-control"
              type="password"
              name="re-password"
              placeholder="Re-Enter Password"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>
          {validationError && (
            <p className="text-danger text-center">{validationError}</p>
          )}
          <div className="text-center mb-3">
            <Link to="/login" className="btn btn-link">
              Already have an account? Login
            </Link>
          </div>
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
