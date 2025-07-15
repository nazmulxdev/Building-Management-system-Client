import { motion } from "framer-motion";
const LoadingSpinner = ({
  isLoading,
  children,
  size = "md",
  color = "primary",
  backdrop = true,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };
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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`${sizeClasses[size]} border-4 border-${color} border-t-transparent rounded-full`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
