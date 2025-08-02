import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_QUOTES } from "../gqlquries/qurie";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h5>{JSON.stringify(error)}</h5>;
  }
  return (
    <div className="container">
      {!data.getQuotes.length ? (
        <h2>No Quotes Available!</h2>
      ) : (
        data.getQuotes.map((item, index) => {
          return (
            <blockquote key={index}>
              <h6>{item.quote}</h6>
              <Link to={`/profile/${item.user._id}`}>
                <p className="right-align">~{item.user.firstName}</p>
              </Link>
            </blockquote>
          );
        })
      )}
    </div>
  );
}
