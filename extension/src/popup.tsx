import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Popup from "./components/pages/popup/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <Popup />
    </div>
  </React.StrictMode>
);
