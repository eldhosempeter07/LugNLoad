import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Navbar, Spinner } from "react-bootstrap";
import {
  GET_USER_INFO,
  UPDATE_USER,
} from "../../../services/graphql/auth/auth";

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USER_INFO }],
  });
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (data && data?.getUserInfo) {
      const { name, email, phone, address } = data?.getUserInfo;
      setProfileData({
        name: name || "",
        email: email || "",
        phone: phone || "",
        address: address || "",
      });
    }
  }, [data]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          user: {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address, // Include address in mutation
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-4">
        <h3 className="text-center mb-4 text-success fw-bold">Profile</h3>
        <div className="d-flex justify-content-center mx-2">
          <Form style={{ width: "400px" }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={profileData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={profileData.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={profileData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
