
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SocialButtons from "@/components/auth/SocialButtons";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";

const SignIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-sm border">
          <SignInForm />
          <SocialButtons mode="signIn" />
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <footer className="bg-slate-50 py-6 border-t border-slate-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} agent.ai. All rights reserved.
      </footer>
    </div>
  );
};

export default SignIn;
