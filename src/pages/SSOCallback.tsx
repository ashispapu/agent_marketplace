
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SSOCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This page is a redirect target for social authentication
    // Typically Clerk will handle the redirect back to the app automatically
    // In most cases, this page is temporary during the redirect flow
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
        <h1 className="text-2xl font-bold">Completing your sign in...</h1>
        <p className="text-muted-foreground">You'll be redirected shortly.</p>
      </div>
    </div>
  );
};

export default SSOCallback;
