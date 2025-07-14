import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { data, roleLoading } = useRole();
  const { currentUser } = useAuth();

  if (roleLoading) return <LoadingSpinner isLoading={roleLoading} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-4 md:p-6"
    >
      {/* header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
            <FaUser className="text-2xl" />
            <span>My Profile</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your account information
          </p>
        </div>
        <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
          <FaUser className="text-white" />
          Regular User
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
              <FaInfoCircle className="text-primary" />
              Personal Information
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="avatar">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl shadow-md">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    data?.name?.charAt(0) || "U"
                  )}
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {data?.name || "No Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data?.email || currentUser?.email}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {new Date(data?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FaEnvelope className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Status</p>
                      <p className="font-medium">
                        {currentUser?.emailVerified
                          ? "Verified"
                          : "Not Verified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apartment information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
              <MdApartment className="text-primary" />
              Apartment Status
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Agreement
                  </span>
                  <span className="badge badge-ghost">None</span>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-1 bg-gray-300 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 text-center">
                  No active agreement
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Apartment</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Floor/Block</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Rent Amount</span>
                  <span className="font-medium">-</span>
                </div>
              </div>

              <button
                className="btn btn-outline btn-primary btn-sm w-full mt-4"
                disabled
              >
                Apply for Apartment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional information */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Last Login</p>
              <p className="font-medium">
                {data?.lastLogIn
                  ? new Date(data.lastLogIn).toLocaleString()
                  : "Never"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Account Status</p>
              <p className="font-medium text-success">Active</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
