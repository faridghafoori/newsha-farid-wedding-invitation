import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LocaleProvider } from "./i18n/LocaleContext.jsx";
import { bootstrapLocale } from "./i18n/locale.js";
import "./index.css";

const initialLocale = bootstrapLocale();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocaleProvider initialLocale={initialLocale}>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
