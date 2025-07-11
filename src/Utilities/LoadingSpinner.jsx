import { motion } from "framer-motion";

const LoadingSpinner = ({ isLoading, children }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-50"
        >
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
