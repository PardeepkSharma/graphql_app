import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqlquries/qurie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Profile() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  useEffect(() => {
    if (error) {
      const gqlError = error.graphQLErrors?.[0];
      const code = gqlError?.extensions?.code;
      console.log(gqlError, ",", code);

      if (code === 401 || gqlError?.message.includes("not authorized")) {
        console.warn("Unauthorized. Redirecting to login...");
        navigate("/login");
      }
    }
  }, [error]);

  if (loading || !data) return <h2>Profile is loading</h2>;

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data?.getMyProfile.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data?.getMyProfile.firstName} {data?.getMyProfile.lastName}
        </h5>
        <h6>Email - {data?.getMyProfile.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data?.getMyProfile.quotes.map((quo, index) => {
        return (
          <blockquote key={index}>
            <h6>{quo.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
