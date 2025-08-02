import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../gqlquries/mutation";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [login, { data, loadind, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("access_token", data.login.access_token);
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: { email: formData.email, password: formData.password },
      });
    } catch (error) {
      console.log("Login Error=", error);
    }
  };
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login</h5>
      <form onSubmit={handleSubmit}>
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
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
