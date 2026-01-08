import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initEmailJS } from "./lib/email";

// Inicializar EmailJS
initEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
