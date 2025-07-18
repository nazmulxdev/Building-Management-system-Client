import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import useRole from "../../../Hooks/useRole";
import Swal from "sweetalert2";
import {
  FaCreditCard,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";
import { FiLoader } from "react-icons/fi";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch user role
  const { data: role, roleLoading } = useRole();

  // Fetch payment details
  const { data, isLoading, error } = useQuery({
    queryKey: ["pending-payment", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/pending-payment/${id}`);
      return response.data;
    },
    retry: 2,
  });

  const finalAmount = data?.result?.finalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    try {
      if (!stripe || !elements) {
        throw new Error("Payment system not ready. Please try again.");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card information not found.");
      }

      if (!finalAmount || finalAmount <= 0) {
        throw new Error("Invalid payment amount.");
      }

      const paymentIntentRes = await axiosSecure.post(`/api/payment-intent`, {
        amount: finalAmount,
      });

      if (!paymentIntentRes.data?.clientSecret) {
        throw new Error("Failed to create payment intent.");
      }

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(paymentIntentRes.data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: role?.name || "Guest",
              email: role?.email || "guest@example.com",
            },
          },
        });

      if (stripeError) throw stripeError;

      if (paymentIntent?.status === "succeeded") {
        const paymentData = {
          transactionId: paymentIntent.id,
          paymentDate: new Date().toISOString(),
        };

        const paymentResponse = await axiosSecure.post(
          `/api/update-payment/${id}`,
          paymentData,
        );

        if (!paymentResponse.data?.success) {
          throw new Error(
            paymentResponse.data?.message || "Payment update failed",
          );
        }

        await Swal.fire({
          position: "center",
          icon: "success",
          title: paymentResponse.data.message || "Payment successful!",
          showConfirmButton: false,
          timer: 1500,
          background: "#f8fafc",
          color: "#1e293b",
        });

        navigate("/dashboard/payments-history");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(error.message || "Payment failed. Please try again.");

      await Swal.fire({
        position: "center",
        icon: "error",
        title: error.message || "Payment failed",
        showConfirmButton: false,
        timer: 1500,
        background: "#f8fafc",
        color: "#1e293b",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner isLoading={true} size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-screen-2xl w-full text-center">
          <div className="text-red-500 mb-6 flex justify-center">
            <FaExclamationCircle className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Payment Error
          </h3>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full btn-primary text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!finalAmount || finalAmount <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-screen-2xl w-full text-center">
          <div className="text-yellow-500 mb-6 flex justify-center">
            <FaExclamationTriangle className="text-5xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Invalid Amount
          </h3>
          <p className="text-gray-600 mb-6">The payment amount is not valid.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full btn-primary text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-screen-2xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <FaCreditCard className="text-white text-2xl" />
              <h2 className="text-2xl font-bold text-white">
                Complete Your Payment
              </h2>
            </div>
            <p className="text-primary-content mt-1">
              Secure payment processing
            </p>
          </div>

          {/* Payment Summary */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Amount Due:</span>
              <span className="text-2xl font-bold text-gray-800">
                ${finalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Payment Method:</span>
              <span className="flex items-center gap-1">
                <FaCreditCard className="text-primary" />
                Credit/Debit Card
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Details
              </label>
              <div className="border border-gray-300 rounded-lg p-3 hover:border-primary transition duration-200">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1e293b",
                        "::placeholder": {
                          color: "#94a3b8",
                        },
                        fontFamily: "'Inter', sans-serif",
                      },
                      invalid: {
                        color: "#dc2626",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <FaExclamationCircle className="flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className={`btn w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
                isProcessing
                  ? "btn-accent cursor-not-allowed"
                  : "btn-primary hover:bg-accent hover:text-primary"
              } flex items-center justify-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <FiLoader className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <FaLock />
                  Pay ${finalAmount.toFixed(2)}
                </>
              )}
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p className="flex items-center justify-center gap-1">
                <FaLock className="text-indigo-500" />
                Your payment is secured with 256-bit SSL encryption
              </p>
              <div className="flex justify-center items-center mt-3 gap-4">
                <SiVisa className="text-2xl text-[#172B85]" />
                <SiMastercard className="text-2xl text-[#016FD0]" />
                <SiAmericanexpress className="text-2xl text-[#016FD0]" />
              </div>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team</p>
          <p className="text-indigo-600">support@buildingmanagement.com</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
