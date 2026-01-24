import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FrameScreen } from "./screens/FrameScreen";

// Import global styles
import "./styles/animations.css";
import "./styles/responsive.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <FrameScreen />
  </StrictMode>,
);
