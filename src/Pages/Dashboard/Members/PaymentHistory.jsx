import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import {
  FaReceipt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercentage,
  FaTag,
  FaLock,
} from "react-icons/fa";
import { MdApartment, MdPayment, MdEmail } from "react-icons/md";
import { format } from "date-fns";
import { useEffect } from "react";

const PaymentHistory = () => {
  const { data: role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: paymentsResponse } = useQuery({
    queryKey: ["payments-history", role?._id],
    enabled: !!role?._id,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/api/payments-history/${role?._id}`,
      );
      return response.data;
    },
  });
  useEffect(() => {
    document.title = "Dashboard | Payment History";
  }, []);

  const paymentsHistory = paymentsResponse?.result || [];

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Calculate totals
  const totalPayments = paymentsHistory.length;
  const totalAmountPaid = paymentsHistory.reduce(
    (sum, payment) => sum + payment.finalAmount,
    0,
  );
  const totalDiscounts = paymentsHistory.reduce(
    (sum, payment) => sum + payment.discountAmount,
    0,
  );
  const lastPaymentDate =
    paymentsHistory.length > 0 ? paymentsHistory[0].paymentDate : null;

  return (
    <LoadingSpinner isLoading={roleLoading || isLoading}>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaReceipt className="text-primary" />
              Payment History
            </h1>
            <p className="text-gray-600 mt-2">
              View all your past transactions and payment details
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Payments</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalPayments}
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <MdPayment className="text-indigo-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Amount Paid</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${totalAmountPaid.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaMoneyBillWave className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Discounts</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${totalDiscounts.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPercentage className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Last Payment</p>
                  <p className="text-xl font-bold text-gray-800">
                    {lastPaymentDate ? formatDate(lastPaymentDate) : "N/A"}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaCalendarAlt className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment History Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <MdApartment /> Apartment
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt /> Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave /> Amount
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <FaPercentage /> Discount
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <FaTag /> Coupon
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <FaLock /> Transaction
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentsHistory.length > 0 ? (
                    paymentsHistory.map((payment) => (
                      <tr key={payment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="text-primary font-bold">
                              Floor:{" "}
                            </span>
                            {payment?.floor} ,
                            <span className="text-primary font-bold">
                              Block:{" "}
                            </span>
                            {payment?.block} ,{" "}
                            <span className="text-primary font-bold">
                              Ap.No.:{" "}
                            </span>
                            {payment.apartmentNo}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(payment.createdAt), "MMM yyyy")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(payment.paymentDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${payment.finalAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            ${payment.originalRent.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.discountPercentage}%
                          </div>
                          <div className="text-xs text-green-600">
                            -${payment.discountAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {payment.couponCode || "None"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="truncate max-w-[120px] sm:max-w-[180px]">
                            {payment.transactionId}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No payment history found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MdEmail className="text-indigo-600" />
              Need Help?
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about your payment history, please
              contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Email Support</p>
                <p className="font-medium text-indigo-600">
                  admin@builmate.com
                </p>
              </div>
              <div className="flex-1 bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Phone Support</p>
                <p className="font-medium text-green-600">+8801600106065</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default PaymentHistory;
