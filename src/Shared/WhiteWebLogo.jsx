import { Link } from "react-router";
import houseLogo from "../assets/home-logo-white.png";

const WhiteWebLogo = () => {
  return (
    <div>
      <Link
        to="/"
        className="flex items-end justify-center gap-1 text-xl font-bold"
      >
        <div className="relative w-24 h-auto">
          <img
            src={houseLogo}
            alt="BuildMate Logo"
            className="w-full h-full object-contain"
            style={{ display: "inline-block", verticalAlign: "baseline" }}
          />
        </div>
        <span
          className="hidden sm:inline text-primary-content text-5xl"
          style={{
            lineHeight: 1,
            paddingBottom: "0.125rem",
          }}
        >
          BuildMate
        </span>
      </Link>
    </div>
  );
};

export default WhiteWebLogo;
