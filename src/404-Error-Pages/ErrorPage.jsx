import { Link } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4"
    >
      <div className="text-center max-w-md mx-auto">
        {/* Error graphic */}
        <div className="mb-8 text-9xl font-bold text-primary">404</div>

        {/* Error message */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-text-secondary mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Home button */}
        <Link
          to="/"
          className="btn btn-primary px-8 py-3 text-lg hover:bg-accent transition-colors"
        >
          Return to Home
        </Link>

        {/* Optional decorative elements */}
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-accent"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
