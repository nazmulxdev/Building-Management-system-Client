import { Link } from "react-router";

const LogInButton = () => (
  <Link
    to="/auth/login"
    className="btn rounded-full border-primary text-primary hover:bg-primary hover:text-primary-content"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-6 h-6"
    >
      <circle cx="12" cy="6" r="4" />
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    </svg>
    {/* <span className="ml-2">Login</span> */}
  </Link>
);
export default LogInButton;
