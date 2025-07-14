import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({
  isLoading,
  children,
  size = "md", // sm, md, lg, xl
  color = "primary", // any Tailwind color class
  backdrop = true, // show semi-transparent backdrop
  fullScreen = false, // cover entire viewport
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  // Container classes based on props
  const containerClasses = `
    ${fullScreen ? "fixed inset-0" : "absolute inset-0"}
    ${backdrop ? "bg-black/10 backdrop-blur-[1px]" : ""}
    flex items-center justify-center z-50
  `;

  return (
    <div className={`relative ${fullScreen ? "min-h-screen" : ""}`}>
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={containerClasses}
        >
          {/* Option 1: Custom SVG Spinner (smoother animation) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`${sizeClasses[size]} border-4 border-${color} border-t-transparent rounded-full`}
          />

          {/* Option 2: React Icons Spinner (alternative) */}
          {/*
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaSpinner className={`${sizeClasses[size]} text-${color}`} />
          </motion.div>
          */}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
