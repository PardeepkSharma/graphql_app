import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../main";
export default function NavBar() {
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right">
          {access_token ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <button
                  className="red btn"
                  onClick={async () => {
                    localStorage.removeItem("access_token");
                    await client.resetStore();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
