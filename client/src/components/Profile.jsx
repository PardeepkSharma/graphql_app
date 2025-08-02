import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqlquries/qurie";
export default function Profile() {
  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (loading) return <h2>Profile is loading</h2>;

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.getMyProfile.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.getMyProfile.firstName} {data.getMyProfile.lastName}
        </h5>
        <h6>Email - {data.getMyProfile.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.getMyProfile.quotes.map((quo, index) => {
        return (
          <blockquote key={index}>
            <h6>{quo.quote}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
