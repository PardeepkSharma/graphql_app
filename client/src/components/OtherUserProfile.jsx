import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER } from "../gqlquries/qurie";
export default function Profile() {
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      userId,
    },
  });

  if (loading) return <h2>Profile is loading</h2>;
  if (error) {
    return <h5>{JSON.stringify(error.message)}</h5>;
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
      {data.getUser.quotes.map((quo, index) => {
        return (
          <blockquote key={index}>
            <h6>{quo.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
