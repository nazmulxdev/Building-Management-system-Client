import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { sweetSuccess } from "../Utilities/alert";

const SocialLoginButton = () => {
  const { signInGoogle, setCurrentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignInByGoogle = () => {
    signInGoogle().then((user) => {
      setCurrentUser(user.user);
      sweetSuccess("You have Logged in successfully");
      navigate(location?.state ? location.state : "/");
    });
  };
  return (
    <div>
      <div className="divider text-text-secondary">OR</div>

      {/* Social Login */}
      <button
        type="button"
        onClick={handleSignInByGoogle}
        className="btn border-primary text-primary w-full flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-content"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Google icon SVG path */}
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLoginButton;
