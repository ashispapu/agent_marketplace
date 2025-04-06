
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Get publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if key exists and log warning instead of throwing error
if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication features will not work. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

// Provide a fallback empty string to prevent the app from crashing
createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY || ""} 
    // Use a simple in-memory session cache when no key is provided
    appearance={{
      variables: { colorPrimary: '#3b82f6' }
    }}
  >
    <App />
  </ClerkProvider>
);
