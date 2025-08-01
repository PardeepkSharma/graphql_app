import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlquries/mutation";

export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [addQuotes] = useMutation(CREATE_QUOTE);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quote);
    try {
      const { data } = await addQuotes({
        variables: {
          quote: quote,
        },
      });
      console.log(data);
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
