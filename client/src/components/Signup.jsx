import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../gqlquries/mutation";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [signupUser, { data, loading, error }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      navigate("/login");
    },
  });

  if (loading) return <h1>Loading</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
    try {
      await signupUser({
        variables: {
          input: { firstName, lastName, email, password },
        },
      });
    } catch (error) {
      console.log("Signup Error=", error);
    }
  };
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}

      {data && data.user && (
        <div className="green card-panel">
          {data.user.firstName} is SignedUp. You can login now!
        </div>
      )}
      <h5>Signup</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/login">
          <p>Already have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
