import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
);
