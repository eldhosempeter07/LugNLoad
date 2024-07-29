import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { HAULER_LOGIN, LOGIN_USER } from "../../../services/graphql/auth/auth";
import { Container } from "react-bootstrap";

const HaulLogin = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [haulerLogin] = useMutation(HAULER_LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.haulerLogin.token);
      localStorage.setItem("name", data.haulerLogin?.user?.name);
      localStorage.setItem("type", data.haulerLogin?.type);
      if (localStorage.getItem("token") != null) {
        setError("");
        navigate("/");
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    client.resetStore();
    try {
      await haulerLogin({ variables: { hauler: { email, password } } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="auth-container">
      <h4 className="text-primary text-center my-5">LOGIN</h4>
      <div className="login-form mx-auto mt-4 p-4 border rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="password"
            />
          </div>

          {error !== "" && <p className="text-danger text-center">{error}</p>}
          <div className="text-center mb-3">
            <Link to="/hauler-register" className="btn btn-link">
              Create Hauler Account
            </Link>
          </div>
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </Container>
  );
};

export default HaulLogin;
