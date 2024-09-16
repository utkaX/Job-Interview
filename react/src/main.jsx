<<<<<<< HEAD
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root=createRoot(document.getElementById('root'))
root.render(
    <App />
)
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from './context/authContext';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>
);
>>>>>>> 4d50cfe39884223af17fdfac39274f9d0ccd8cd1
