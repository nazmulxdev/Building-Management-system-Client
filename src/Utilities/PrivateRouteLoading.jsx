import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const PrivateRouteLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-base-100/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center gap-4"
    >
      {/* Shield Icon with Pulse Animation */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaShieldAlt className="text-5xl text-primary" />
      </motion.div>

      {/* Text with Typing Effect */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-medium text-primary-content"
      >
        Verifying access...
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        className="w-64 bg-base-300 rounded-full h-2 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default PrivateRouteLoading;
