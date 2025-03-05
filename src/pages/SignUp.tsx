
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialButtons from "@/components/auth/SocialButtons";
import Navbar from "@/components/common/Navbar";

const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-sm border">
          <SignUpForm />
          <SocialButtons mode="signUp" />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary font-medium hover:underline">
              Sign in
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

export default SignUp;
