import { useNavigate } from "react-router";
import { FaLock, FaHome, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden text-center border border-gray-200"
      >
        {/* Header with icon */}
        <div className="bg-red-500 p-6 flex justify-center">
          <div className="bg-white p-3 rounded-full">
            <FaLock className="text-red-500 text-3xl" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-center text-yellow-500 mb-4">
            <FaExclamationTriangle className="text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have the necessary permissions to view this page. Please
            contact your administrator if you believe this is an error.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FaHome /> Home Page
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
          <p>Error Code: 403 Forbidden</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
