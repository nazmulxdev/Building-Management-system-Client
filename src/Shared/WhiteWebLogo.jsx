import { Link } from "react-router";
import houseLogo from "../assets/home-logo-white.png";
import { motion } from "framer-motion";
const WhiteWebLogo = () => {
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Link to="/" className="flex items-end justify-center gap-2 group">
        {/* Logo with hover glow */}
        <motion.div
          className="relative w-24 h-auto transition-all duration-300"
          whileHover={{ rotate: -5 }}
        >
          <img
            src={houseLogo}
            alt="BuildMate Logo"
            className="w-full h-full object-contain transition-all duration-300 
                     group-hover:drop-shadow-[0_0_10px_rgba(248,212,116,0.7)]"
          />
        </motion.div>
        <motion.span
          className="hidden sm:inline text-primary-content text-5xl font-bold
                   transition-colors duration-300 
                   group-hover:text-[#f8d474] group-hover:drop-shadow-lg"
          initial={{ opacity: 0.9 }}
          whileHover={{
            opacity: 1,
            textShadow: "0 0 8px rgba(248, 212, 116, 0.6)",
          }}
          style={{
            lineHeight: 1,
            paddingBottom: "0.125rem",
          }}
        >
          BuildMate
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default WhiteWebLogo;
