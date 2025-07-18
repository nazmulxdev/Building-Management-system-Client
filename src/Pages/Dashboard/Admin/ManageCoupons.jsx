import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiPlus,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiCalendar,
  FiPercent,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageCoupons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    description: "",
    expiry: "",
    status: "active",
  });
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const colorOptions = [
    "bg-gradient-to-r from-emerald-500 to-teal-500",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
  ];

  useEffect(() => {
    document.title = "Dashboard | Coupons";
  }, []);

  // Fetch all coupons
  const {
    data: couponsData = { data: [], pagination: {} },
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["coupons", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/coupons?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: coupons = [], pagination = {} } = couponsData;
  const { totalPages = 1, currentPage: Page = 1, totalItems = 0 } = pagination;

  // Create new coupon
  const createCouponMutation = useMutation({
    mutationFn: (couponData) => axiosSecure.post("/api/coupons", couponData),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      queryClient.invalidateQueries(["valid-coupons"]);
      Swal.fire({
        title: "Success!",
        text: "Coupon created successfully",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
        background: "var(--color-base-100)",
        color: "var(--color-text)",
      });
      setIsModalOpen(false);
      setNewCoupon({
        code: "",
        discount: "",
        description: "",
        expiry: "",
        status: "active",
      });
      setCurrentPage(1);
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create coupon",
        icon: "error",
        background: "var(--color-base-100)",
        color: "var(--color-text)",
      });
    },
  });

  // Toggle coupon status
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/api/coupons/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      queryClient.invalidateQueries(["valid-coupons"]);
      Swal.fire({
        title: "Updated!",
        text: "Coupon status updated",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "var(--color-base-100)",
        color: "var(--color-text)",
      });
    },
  });

  // Delete coupon
  const deleteCouponMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/api/coupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      queryClient.invalidateQueries(["valid-coupons"]);
      Swal.fire({
        title: "Deleted!",
        text: "Coupon has been deleted",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "var(--color-base-100)",
        color: "var(--color-text)",
      });
      if (coupons.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add random color and creation date
    const couponWithExtras = {
      ...newCoupon,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      createdAt: new Date().toISOString(),
    };

    createCouponMutation.mutate(couponWithExtras);
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const statusText = newStatus === "active" ? "activate" : "deactivate";

    Swal.fire({
      title: "Are you sure?",
      text: `You're about to ${statusText} this coupon.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-error)",
      confirmButtonText: `Yes, ${statusText} it!`,
      background: "var(--color-base-100)",
      color: "var(--color-text)",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatusMutation.mutate({ id, status: newStatus });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Coupon?",
      text: "This action cannot be undone. All associated data will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-error)",
      cancelButtonColor: "var(--color-text-secondary)",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      background: "var(--color-base-100)",
      color: "var(--color-text)",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCouponMutation.mutate(id);
      }
    });
  };

  //pagination range
  const getPaginationRange = () => {
    const range = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <div className="p-4 sm:p-6 lg:p-8 bg-base-200 min-h-screen">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center justify-center text-primary ">
                <FiTag></FiTag> <span>Coupon Management</span>
              </h1>
              <p className="text-text-secondary mt-2">
                Showing {coupons.length} of {totalItems} coupons
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary gap-2"
            >
              <FiPlus className="text-lg" />
              Create Coupon
            </motion.button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-base-100 rounded-xl shadow-md overflow-hidden border border-base-300"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-base-300">
              <thead className="bg-base-300">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text uppercase tracking-wider">
                    Coupon
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text uppercase tracking-wider hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text uppercase tracking-wider hidden sm:table-cell">
                    Expiry
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-text uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-base-100 divide-y divide-base-300">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <h1 className="font-bold text-2xl text-primary">
                        Refreshing...
                      </h1>
                    </td>
                  </tr>
                ) : coupons.length > 0 ? (
                  coupons.map((coupon, index) => (
                    <motion.tr
                      key={coupon._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`flex items-center ${coupon.color} text-primary-content rounded-full px-4 py-2 w-fit`}
                        >
                          <FiTag className="mr-2" />
                          <span className="font-semibold">{coupon.code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text font-medium">
                        <div className="flex items-center">
                          <FiPercent className="mr-1 text-text-secondary" />
                          {coupon.discount}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary hidden md:table-cell">
                        {coupon.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="flex items-center text-text-secondary">
                          <FiCalendar className="mr-2" />
                          {new Date(coupon.expiry).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          title="Change Status"
                          onClick={() =>
                            handleToggleStatus(coupon._id, coupon.status)
                          }
                          className={`flex items-center gap-2 px-3 py-1 
                           hover:cursor-pointer rounded-full text-sm font-medium ${
                             coupon.status === "active"
                               ? "bg-success/20 text-success"
                               : "bg-error/20 text-error"
                           }`}
                        >
                          {coupon.status === "active" ? (
                            <FiToggleRight className="text-success" />
                          ) : (
                            <FiToggleLeft className="text-error" />
                          )}
                          {coupon.status.charAt(0).toUpperCase() +
                            coupon.status.slice(1)}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="text-error hover:text-error/80 p-2 rounded-full hover:bg-error/10 transition-colors hover:cursor-pointer"
                          title="Delete coupon"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-text-secondary flex flex-col items-center justify-center">
                        <FiTag className="text-4xl mb-4 opacity-50" />
                        <p className="text-xl font-medium">No coupons found</p>
                        <p className="mt-2">
                          Create your first coupon to get started
                        </p>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 btn btn-primary btn-sm"
                        >
                          Create Coupon
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-base-100 border-t border-base-300 gap-4">
              <div className="text-sm text-text-secondary">
                Page {currentPage} of {totalPages}
              </div>
              <div className="join">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="join-item btn btn-sm btn-ghost"
                  title="First page"
                >
                  <FiChevronLeft className="mr-1" />
                  First
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="join-item btn btn-sm"
                  title="Previous page"
                >
                  <FiChevronLeft />
                </button>

                {getPaginationRange().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`join-item btn btn-sm ${
                      currentPage === pageNum ? "btn-primary" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="join-item btn btn-sm"
                  title="Next page"
                >
                  <FiChevronRight />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="join-item btn btn-sm btn-ghost"
                  title="Last page"
                >
                  Last
                  <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Add Coupon Modal  */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-base-100 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-base-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-text">
                      Create New Coupon
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-text-secondary hover:text-text"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Coupon Code
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <FiTag />
                          </div>
                          <input
                            type="text"
                            name="code"
                            value={newCoupon.code}
                            onChange={handleInputChange}
                            required
                            className="pl-10 input input-bordered w-full bg-base-100"
                            placeholder="e.g., SUMMER25"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Discount Percentage
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <FiPercent />
                          </div>
                          <input
                            type="number"
                            name="discount"
                            value={newCoupon.discount}
                            onChange={handleInputChange}
                            required
                            min="1"
                            max="100"
                            className="pl-10 input input-bordered w-full bg-base-100"
                            placeholder="e.g., 20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          value={newCoupon.description}
                          onChange={handleInputChange}
                          required
                          className="input input-bordered w-full bg-base-100"
                          placeholder="e.g., Summer special discount"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text mb-2">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                            <FiCalendar />
                          </div>
                          <input
                            type="date"
                            name="expiry"
                            value={newCoupon.expiry}
                            onChange={handleInputChange}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="pl-10 input input-bordered w-full bg-base-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="btn btn-ghost"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary"
                        disabled={createCouponMutation.isLoading}
                      >
                        {createCouponMutation.isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="loading loading-spinner loading-sm"></span>
                            Creating...
                          </span>
                        ) : (
                          "Create Coupon"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LoadingSpinner>
  );
};

export default ManageCoupons;
