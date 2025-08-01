import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import routes from "./routes";
import NavBar from "./components/NavBar";
import { useRoutes } from "react-router-dom";

function App() {
  const elements = useRoutes(routes);

  return (
    <>
      <div>
        <NavBar />
        {elements}
      </div>
    </>
  );
}

export default App;
