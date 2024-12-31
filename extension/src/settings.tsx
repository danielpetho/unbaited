import React from "react";
import ReactDOM from "react-dom/client";
import Settings from "./components/pages/settings/index.tsx"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <Settings />
    </div>
  </React.StrictMode>
);
