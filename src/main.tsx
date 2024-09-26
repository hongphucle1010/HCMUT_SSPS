import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Flowbite } from "flowbite-react";
import "./index.css";
import "flowbite";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Flowbite>
      <App />
    </Flowbite>
  </React.StrictMode>
);
