import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiCalendar, FiPercent, FiCreditCard } from "react-icons/fi";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";

const MakePayment = () => {
  const { currentUser } = useAuth();
  const { data: role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  console.log(role);
  // member's agreement data
  const {
    data: member,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["member-agreement", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/member-agreement/${currentUser?.email}`,
      );
      return res.data.data;
    },
    enabled: !!currentUser?.email,
  });

  // Handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Apply coupon handler
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a coupon code",
        icon: "warning",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/api/validate-coupon", {
        code: couponCode,
      });

      setAppliedCoupon(res.data.data);

      Swal.fire({
        title: "Success!",
        text: `${res.data.data.discount}% discount applied`,
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      Swal.fire({
        title: "Invalid Coupon",
        text: error.response?.data?.message || "This coupon cannot be applied",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Remove coupon handler
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Calculate amounts
  const discountAmount =
    member?.rent && appliedCoupon
      ? (member.rent * appliedCoupon.discount) / 100
      : 0;

  const finalAmount = member?.rent ? member.rent - discountAmount : 0;

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!selectedMonth) {
      Swal.fire({
        title: "Missing Information",
        text: "Please select payment month",
        icon: "warning",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    const [year, month] = selectedMonth.split("-");

    const paymentData = {
      userId: role._id,
      apartmentId: member.apartmentId,
      apartmentNo: member.apartmentNo,
      month: parseInt(month),
      year: parseInt(year),
      originalRent: member.rent,
      discountPercentage: appliedCoupon?.discount || 0,
      discountAmount: discountAmount || 0,
      finalAmount: finalAmount || 0,

      couponCode: appliedCoupon?.code || "",
      email: currentUser?.email,
    };

    try {
      const response = await axiosSecure.post(
        "/api/checkout-payment",
        paymentData,
      );
      console.log(response.data);

      if (response?.data?.success) {
        await Swal.fire({
          icon: "success",
          title: response?.data?.message || "Payment initiated successfully",
          showConfirmButton: true,
        });
        navigate(`/dashboard/checkout/${response?.data?.id}`);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        return Swal.fire({
          icon: "info",
          title: "Already Paid",
          text: error.response.data?.message || "Payment already exists",
        });
      }
    }
  };
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error shadow-lg max-w-screen-2xl">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error loading payment details. Please try again.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LoadingSpinner isLoading={roleLoading || isLoading}>
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-2xl mx-auto w-full"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Monthly Rent Payment
            </h1>
            <p className="text-lg text-text-secondary">
              Pay your rent securely with our payment system
            </p>
          </div>

          <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden border border-base-300">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Member Email
                    </label>
                    <input
                      type="email"
                      value={currentUser?.email}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Floor
                    </label>
                    <input
                      type="text"
                      value={member?.floor || ""}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Block Name
                    </label>
                    <input
                      type="text"
                      value={member?.block || ""}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Apartment/Room No
                    </label>
                    <input
                      type="text"
                      value={member?.apartmentNo || ""}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Monthly Rent
                    </label>
                    <input
                      type="text"
                      value={`$${member?.rent?.toLocaleString() || "0"}`}
                      readOnly
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Payment Month
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                        <FiCalendar />
                      </div>
                      <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        min={`${new Date().getFullYear()}-${String(
                          new Date().getMonth() + 1,
                        ).padStart(2, "0")}`}
                        className="pl-10 input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-text mb-4 flex items-center gap-2">
                  <FiPercent className="text-accent" />
                  <span>Apply Coupon Code</span>
                </h3>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-grow input input-bordered"
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleRemoveCoupon}
                        className="btn btn-error"
                      >
                        Remove Coupon
                      </button>
                      <div className="badge badge-success gap-2 p-4">
                        {appliedCoupon.discount}% OFF
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="btn btn-primary"
                    >
                      Apply Coupon
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-base-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium text-text mb-4">
                  Payment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Monthly Rent:</span>
                    <span className="font-medium">
                      ${member?.rent?.toLocaleString() || "0"}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">
                          Discount ({appliedCoupon.discount}%):
                        </span>
                        <span className="text-success font-medium">
                          -${discountAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="divider my-1"></div>
                    </>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">
                      ${finalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePaymentSubmit}
                  className="btn btn-primary btn-lg shadow-lg"
                  disabled={!selectedMonth}
                >
                  <FiCreditCard className="text-xl" />
                  Proceed to Payment
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </LoadingSpinner>
  );
};

export default MakePayment;
