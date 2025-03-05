
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserSettingsProvider } from "./contexts/UserSettingsContext";
import { SignedIn, SignedOut, ClerkLoaded } from "@clerk/clerk-react";
import Index from "./pages/Index";
import AgentDetails from "./pages/AgentDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SSOCallback from "./pages/SSOCallback";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <ClerkLoaded>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <Navigate to="/signin" replace />
    </SignedOut>
  </ClerkLoaded>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserSettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/agent/:id" element={<AgentDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/sso-callback" element={<SSOCallback />} />
            
            {/* Protected routes */}
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserSettingsProvider>
  </QueryClientProvider>
);

export default App;
