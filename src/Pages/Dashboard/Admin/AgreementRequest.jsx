import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaFileContract,
  FaChartLine,
  FaListUl,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: agreements,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/pending-agreements");
      return res.data;
    },
  });

  const handleDecision = async (id, decision) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${decision} this agreement?`,
        text: "This action cannot be undone",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#004d40",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${decision}`,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        alert("hi");
        if (result.isConfirmed) {
          await Swal.fire({
            title: "Success!",
            text: `Agreement ${decision}ed successfully`,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          refetch();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to process request",
        "error",
      );
    }
  };

  if (isLoading)
    return <LoadingSpinner isLoading={isLoading} size="xl" fullScreen />;

  if (isError) {
    console.error("Error loading agreements:", error);
    return (
      <div className="alert alert-error shadow-lg max-w-md mx-auto mt-8">
        <div>
          <FaTimes className="text-xl" />
          <span>
            Failed to load agreement requests. Please try again later.
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FaFileContract className="text-4xl text-primary" />
            <h1 className="text-3xl font-bold text-primary">
              Agreement Requests
            </h1>
          </div>
          <p className="text-gray-500">
            Review and manage pending apartment applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="stats shadow-lg bg-gradient-to-r from-primary to-primary/90 text-primary-content"
        >
          <div className="stat">
            <div className="stat-figure text-primary-content">
              <FaListUl className="text-3xl" />
            </div>
            <div className="text-primary-content">Pending Requests</div>
            <div className="stat-value">{agreements?.length || 0}</div>
            <div className="text-primary-content">Awaiting your review</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="stats shadow-lg bg-gradient-to-r from-secondary to-secondary/90 text-secondary-content"
        >
          <div className="stat">
            <div className="stat-figure text-secondary-content/80">
              <FaMoneyBillWave className="text-3xl" />
            </div>
            <div className="text-primary-content">Potential Revenue</div>
            <div className="stat-value">
              ${agreements?.reduce((sum, a) => sum + a.rent, 0) || 0}
            </div>
            <div className="text-primary-content">Monthly if all approved</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="stats shadow-lg bg-gradient-to-r from-accent to-accent/90 text-accent-content"
        >
          <div className="stat">
            <div className="stat-figure text-accent-content">
              <FaChartLine className="text-3xl" />
            </div>
            <div className="text-accent-content">Avg. Rent</div>
            <div className="stat-value">
              $
              {agreements?.length
                ? Math.round(
                    agreements.reduce((sum, a) => sum + a.rent, 0) /
                      agreements.length,
                  )
                : 0}
            </div>
            <div className="text-accent-content">Per apartment</div>
          </div>
        </motion.div>
      </div>

      {/* Responsive Table Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Header - Hidden on mobile */}
            <thead className="bg-base-200 hidden sm:table-header-group">
              <tr>
                <th>Applicant</th>
                <th>Details</th>
                <th className="text-right">Rent</th>
                <th>Request Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {agreements?.length ? (
                agreements.map((agreement) => (
                  <motion.tr
                    key={agreement._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-base-100 border-b border-gray-100"
                  >
                    {/* User Info - Stacked on mobile */}
                    <td className="py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {agreement.userName}
                        </span>
                        <span className="text-xs text-gray-500 break-all">
                          {agreement.userEmail}
                        </span>
                        <div className="sm:hidden mt-1 flex flex-wrap gap-1">
                          <span className="badge badge-outline">
                            Floor: {agreement.floor}
                          </span>
                          <span className="badge badge-outline">
                            Block: {agreement.block}
                          </span>
                          <span className="badge badge-outline">
                            Apartment: {agreement.apartmentNo}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Details - Hidden on mobile (shown in user cell) */}
                    <td className="hidden sm:table-cell">
                      <div className="flex flex-wrap gap-2">
                        <span>Floor {agreement.floor}</span>
                        <span>•</span>
                        <span>Block {agreement.block}</span>
                        <span>•</span>
                        <span>Apartment. {agreement.apartmentNo}</span>
                      </div>
                    </td>

                    {/* Rent */}
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <FaMoneyBillWave className="text-green-500 hidden sm:inline" />
                        <span className="font-bold">${agreement.rent}</span>
                      </div>
                    </td>

                    {/* Request Date */}
                    <td className="hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-primary" />
                        <span>
                          {new Date(
                            agreement.agreementDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleDecision(agreement._id, "approved")
                          }
                          className="btn btn-success btn-sm gap-1"
                        >
                          <FaCheck />{" "}
                          <span className="hidden sm:inline">Accept</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handleDecision(agreement._id, "rejected")
                          }
                          className="btn btn-error btn-sm gap-1"
                        >
                          <FaTimes />{" "}
                          <span className="hidden sm:inline">Reject</span>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FaFileContract className="text-5xl" />
                      <p className="text-lg">No pending agreement requests</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AgreementRequest;
