import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaLayerGroup,
  FaHashtag,
  FaFileSignature,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MemberProfile = () => {
  const { data, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const { data: member } = useQuery({
    queryKey: ["member-agreement", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/member-agreement/${currentUser?.email}`,
      );
      return res.data.data;
    },
    enabled: !!currentUser?.email,
  });

  console.log(data);
  console.log(member);

  if (roleLoading)
    return <LoadingSpinner isLoading={roleLoading} size="xl" fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-screen-2xl mx-auto p-4 md:p-6"
    >
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
            <FaUser className="text-2xl" />
            <span>My Profile</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View your account and apartment information
          </p>
        </div>
        <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
          <FaUser className="text-white" />
          {data.role}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
              <FaUser className="text-primary" />
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
                  <p className="text-base text-primary">
                    {data?.email || currentUser?.email}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <div>
                      <p className="text-base text-primary">Member Since</p>
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
                      <p className="text-base text-primary">Email Status</p>
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

        {/* Apartment Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-700">
              <FaBuilding className="text-primary" />
              Apartment Information
            </h2>

            <div className="space-y-4">
              {/* Status Indicator */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FaFileSignature className="text-primary" />
                </div>
                <div>
                  <p className="text-base text-primary">Agreement Status</p>
                  <p className="font-medium">{member?.decision}</p>
                </div>
              </div>

              {/* Detailed Apartment Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FaLayerGroup className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary">Floor Number</p>
                    <p className="font-medium">{member?.floor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FaBuilding className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary">Block Name</p>
                    <p className="font-medium">{member?.block}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FaHashtag className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary">Apartment Number</p>
                    <p className="font-medium">{member?.apartmentNo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FaMoneyBillWave className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary">Rent Amount</p>
                    <p className="font-medium">${member?.rent}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MdDateRange className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base text-primary">Agreement Date</p>
                    <p className="font-medium">{member?.checkedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Account Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="p-2 bg-primary/10 rounded-full">
                <FaCalendarAlt className="text-primary" />
              </div>
              <div>
                <p className="text-base text-primary">Last Login</p>
                <p className="font-medium">
                  {data?.lastLogIn
                    ? new Date(data.lastLogIn).toLocaleString()
                    : "Never"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="p-2 bg-primary/10 rounded-full">
                <FaEnvelope className="text-primary" />
              </div>
              <div>
                <p className="text-base text-primary">Account Type</p>
                <p className="font-medium">{data?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberProfile;
