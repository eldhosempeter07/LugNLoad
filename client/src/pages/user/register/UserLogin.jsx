import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../../services/graphql/auth/auth";
import { Container } from "react-bootstrap";

const UserLogin = () => {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.loginUser.token);
      localStorage.setItem("name", data.loginUser?.user?.name);
      localStorage.setItem("type", data.loginUser?.type);
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
      await loginUser({ variables: { user: { email, password } } });
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
            <Link to="/register" className="btn btn-link">
              Register As User
            </Link>
          </div>
          <button className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </Container>
  );
};

export default UserLogin;
