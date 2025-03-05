
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Twitter, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SocialButtonsProps = {
  mode: "signIn" | "signUp";
};

const SocialButtons = ({ mode }: SocialButtonsProps) => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { toast } = useToast();

  const handleSocialSignIn = async (provider: "oauth_google" | "oauth_twitter") => {
    try {
      if (mode === "signIn") {
        signIn?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/",
        });
      } else {
        signUp?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "Could not authenticate with provider",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("oauth_google")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="mr-2"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"/></svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("oauth_twitter")}
        >
          <Twitter className="mr-2 h-4 w-4" />
          X (Twitter)
        </Button>
      </div>
    </div>
  );
};

export default SocialButtons;
