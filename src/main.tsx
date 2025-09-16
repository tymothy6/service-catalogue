import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@bcgov/bc-sans/css/BC_Sans.css";
import "./index.css";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(<App />);