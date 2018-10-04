import React, { Placeholder } from "react";
import { unstable_createRoot } from "react-dom";
import App from "./App.my-solution";
import "./lib/index.css";

unstable_createRoot(document.getElementById("root")).render(
  <Placeholder delayMs={1000} fallback={<div>Loading...</div>}>
    <App />
  </Placeholder>
);
