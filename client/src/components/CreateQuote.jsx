import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlquries/mutation";
import { useNavigate } from "react-router-dom";
import { GET_ALL_QUOTES, GET_MY_PROFILE } from "../gqlquries/qurie";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();
  const [addQuotes] = useMutation(CREATE_QUOTE, {
    refetchQueries: [{ query: GET_MY_PROFILE }, { query: GET_ALL_QUOTES }],
    awaitRefetchQueries: true,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuotes({
        variables: {
          quote: quote,
        },
      });
      navigate("/profile");
    } catch (error) {
      console.log("Create Quote Error=", error);
    }
  };
  return (
    <div className="container my-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
}
