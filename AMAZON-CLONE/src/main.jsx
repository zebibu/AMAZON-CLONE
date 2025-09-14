// /src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./components/DataProvider/DataProvider";
import { Reducer, initialState } from "./Utility/Reducer.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={Reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
