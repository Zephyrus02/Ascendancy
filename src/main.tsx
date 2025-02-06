import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { init } from '@emailjs/browser';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_PUBLIC_CLERK_FRONTEND_API

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

init('YOUR_PUBLIC_KEY');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)