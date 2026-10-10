import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProviderWrapper } from "./theme/ThemeContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <App />
    </ThemeProviderWrapper>
  </React.StrictMode>
);