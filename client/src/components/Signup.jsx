import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP } from "../gqlquries/mutation";
export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { firstName, lastName, email, password } = formData;
    try {
      const { data } = await signUp({
        variables: {
          input: { firstName, lastName, email, password },
        },
      });
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log("Signup Error=", error);
    }
  };

  if (loading) {
    <h3>Loading...</h3>;
  }
  return (
    <div className="container my-container">
      <h5>Signup!!</h5>
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
