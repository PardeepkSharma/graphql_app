import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqlquries/qurie";
export default function Profile() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE);
  if (!localStorage.getItem("access_token")) {
    navigate("/login");
    return <h1>unauthorized</h1>;
  }
  if (loading) return <h2>Profile is loading</h2>;
  if (error) {
    console.log(error);
  }
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.getUser.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.getUser.firstName} {data.getUser.lastName}
        </h5>
        <h6>Email - {data.getUser.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.getUser.quotes.map((quo) => {
        return (
          <blockquote>
            <h6>{quo.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
