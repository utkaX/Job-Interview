
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.jsx'

const root=createRoot(document.getElementById('root'))
root.render(
    <App />
)

import { AuthProvider } from './context/authContext';
createRoot(document.getElementById("root")).render(
    <AuthProvider>
    <App />
    </AuthProvider>
);
