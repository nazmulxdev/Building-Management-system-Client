import { useQuery } from "@tanstack/react-query";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  FaBuilding,
  FaUser,
  FaUserShield,
  FaHome,
  FaChartPie,
  FaBed,
  FaEnvelope,
  FaPercentage,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";

const AdminProfile = () => {
  const { data: role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const { currentUser, loading } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ["count", role?.role],
    queryFn: async () => {
      const response = await axiosSecure.get("/api/count");
      return response?.data;
    },
  });

  console.log(data?.apartmentsCount);

  useEffect(() => {
    document.title = `Dashboard | ${role?.name}`;
  }, [role]);

  const apartmentStats = data?.apartmentsCount?.[0] || {};
  const userStats = data?.userCount?.[0] || {};

  // Data for charts
  const apartmentData = [
    {
      name: "Available",
      value: apartmentStats.availableApartments,
      color: "#16a34a",
    },
    {
      name: "Pending",
      value: apartmentStats.pendingApartments,
      color: "#f59e0b",
    },
    {
      name: "Booked",
      value: apartmentStats.bookedApartments,
      color: "#dc2626",
    },
  ];

  const userData = [
    { name: "Admins", value: userStats.totalAdmin, color: "#004d40" },
    { name: "Members", value: userStats.totalMember, color: "#2563eb" },
    { name: "Users", value: userStats.totalUser, color: "#64748b" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const statCardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <LoadingSpinner isLoading={roleLoading || isLoading || loading}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-4 sm:p-6"
      >
        <div className="max-w-screen-2xl mx-auto">
          {/* Admin Profile Header */}
          <motion.div
            variants={itemVariants}
            className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-8 border border-base-300"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-primary/10 overflow-hidden flex items-center justify-center shadow-md">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-primary-content text-4xl font-bold">
                      {currentUser?.displayName?.charAt(0) || "A"}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <FaUserShield size={14} /> Admin
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-primary mb-1">
                  {currentUser?.displayName || "Admin"}
                </h1>
                <div className="flex items-center gap-2 text-text-secondary mb-4">
                  <FaEnvelope size={14} />
                  <p>{currentUser?.email}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaBuilding />
                    <span>
                      Total Apartments:{" "}
                      <strong>{apartmentStats.totalApartments || 0}</strong>
                    </span>
                  </div>
                  <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaBed />
                    <span>
                      Total Bedrooms:{" "}
                      <strong>{apartmentStats.totalBedrooms || 0}</strong>
                    </span>
                  </div>
                  <div className="bg-accent/10 text-accent px-4 py-2 rounded-lg flex items-center gap-2">
                    <FaUser />
                    <span>
                      Total Users:{" "}
                      <strong>{userStats.totalWebSiteUsers || 0}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Apartments Summary */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              variants={statCardVariants}
              className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-sm">
                  <FaBuilding size={24} />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  Apartments Status
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={apartmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {apartmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${value} apartments ${name}`,
                          "",
                        ]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary">Available</span>
                      <span className="font-semibold text-success flex items-center gap-1">
                        {apartmentStats.apartmentPercentage?.available || 0}%{" "}
                        <FaPercentage size={12} />
                      </span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2.5">
                      <div
                        className="bg-success h-2.5 rounded-full"
                        style={{
                          width: `${
                            apartmentStats.apartmentPercentage?.available || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary">Pending</span>
                      <span className="font-semibold text-warning flex items-center gap-1">
                        {apartmentStats.apartmentPercentage?.pending || 0}%{" "}
                        <FaPercentage size={12} />
                      </span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2.5">
                      <div
                        className="bg-warning h-2.5 rounded-full"
                        style={{
                          width: `${
                            apartmentStats.apartmentPercentage?.pending || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary">Booked</span>
                      <span className="font-semibold text-error flex items-center gap-1">
                        {apartmentStats.apartmentPercentage?.booked || 0}%{" "}
                        <FaPercentage size={12} />
                      </span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-2.5">
                      <div
                        className="bg-error h-2.5 rounded-full"
                        style={{
                          width: `${
                            apartmentStats.apartmentPercentage?.booked || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bedrooms Summary */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              variants={statCardVariants}
              className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300 hover:border-secondary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 rounded-xl text-secondary shadow-sm">
                  <FaBed size={24} />
                </div>
                <h2 className="text-xl font-bold text-secondary">
                  Bedrooms Status
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary">Total Bedrooms</p>
                    <p className="text-3xl font-bold">
                      {apartmentStats.totalBedrooms || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Pending Bedrooms</p>
                    <p className="text-3xl font-bold">
                      {apartmentStats.pendingBedrooms || 0}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-secondary">Available</p>
                    <p className="text-3xl font-bold text-success">
                      {apartmentStats.availableBedrooms || 0}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-success/10 p-3 rounded-lg">
                    <p className="text-sm text-text-secondary">Available</p>
                    <p className="text-xl font-bold text-success">
                      {apartmentStats.bedroomPercentage?.available || 0}%
                    </p>
                  </div>
                  <div className="bg-warning/10 p-3 rounded-lg">
                    <p className="text-sm text-text-secondary">Pending</p>
                    <p className="text-xl font-bold text-warning">
                      {apartmentStats.bedroomPercentage?.pending || 0}%
                    </p>
                  </div>
                  <div className="bg-error/10 p-3 rounded-lg">
                    <p className="text-sm text-text-secondary">Booked</p>
                    <p className="text-xl font-bold text-error">
                      {apartmentStats.bedroomPercentage?.booked || 0}%
                    </p>
                  </div>
                </div>

                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Bedrooms",
                          available: apartmentStats.availableBedrooms,
                          pending: apartmentStats.pendingBedrooms,
                          booked: apartmentStats.bookedBedrooms,
                        },
                      ]}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="available"
                        fill="#16a34a"
                        name="Available"
                      />
                      <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                      <Bar dataKey="booked" fill="#dc2626" name="Booked" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Users Summary */}
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              variants={statCardVariants}
              className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300 hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/10 rounded-xl text-accent shadow-sm">
                  <FaUser size={24} />
                </div>
                <h2 className="text-xl font-bold text-accent">
                  Users Overview
                </h2>
              </div>

              <div className="flex flex-col h-full">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg text-center">
                    <p className="text-sm text-text-secondary">Admins</p>
                    <p className="text-2xl font-bold text-primary">
                      {userStats.totalAdmin || 0}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {userStats.percentageOfAdmin || 0}% of total
                    </p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-lg text-center">
                    <p className="text-sm text-text-secondary">Members</p>
                    <p className="text-2xl font-bold text-secondary">
                      {userStats.totalMember || 0}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {userStats.percentageOfMember || 0}% of total
                    </p>
                  </div>
                  <div className="bg-neutral/10 p-3 rounded-lg text-center">
                    <p className="text-sm text-text-secondary">Users</p>
                    <p className="text-2xl font-bold text-neutral">
                      {userStats.totalUser || 0}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {userStats.percentageOfUsers || 0}% of total
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {userData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} ${name}`, ""]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Summary Section */}
          <motion.div
            variants={itemVariants}
            className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300 mb-8"
          >
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FaChartPie /> Quick Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-success/10 p-4 rounded-lg">
                <p className="text-sm text-text-secondary mb-1">
                  Available Apartments
                </p>
                <p className="text-2xl font-bold text-success">
                  {apartmentStats.availableApartments || 0}
                </p>
                <p className="text-xs text-success mt-1">
                  {apartmentStats.apartmentPercentage?.available || 0}% of total
                </p>
              </div>

              <div className="bg-warning/10 p-4 rounded-lg">
                <p className="text-sm text-text-secondary mb-1">
                  Pending Agreements
                </p>
                <p className="text-2xl font-bold text-warning">
                  {apartmentStats.pendingApartments || 0}
                </p>
                <p className="text-xs text-warning mt-1">
                  {apartmentStats.apartmentPercentage?.pending || 0}% of total
                </p>
              </div>

              <div className="bg-error/10 p-4 rounded-lg">
                <p className="text-sm text-text-secondary mb-1">
                  Booked Apartments
                </p>
                <p className="text-2xl font-bold text-error">
                  {apartmentStats.bookedApartments || 0}
                </p>
                <p className="text-xs text-error mt-1">
                  {apartmentStats.apartmentPercentage?.booked || 0}% of total
                </p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-text-secondary mb-1">
                  Total Members
                </p>
                <p className="text-2xl font-bold text-primary">
                  {userStats.totalMember || 0}
                </p>
                <p className="text-xs text-primary mt-1">
                  {userStats.percentageOfMember || 0}% of users
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </LoadingSpinner>
  );
};

export default AdminProfile;
