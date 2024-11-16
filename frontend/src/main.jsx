import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/css/spacing.css'
import './assets/css/style.css'
import './assets/css/responsive.css'

export const server = import.meta.env.VITE_BACKEND_URL

console.log("Running in:", process.env.NODE_ENV);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  //  </StrictMode> 
)