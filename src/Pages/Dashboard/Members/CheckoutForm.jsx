import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);

  const { data, isLoading } = useQuery({
    queryKey: ["pending-payment", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/pending-payment/${id}`);
      return response.data;
    },
  });

  console.log(data?.result);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error?.message);
    } else {
      setErrorMessage("");
      console.log(paymentMethod);
    }
  };

  return (
    <LoadingSpinner isLoading={isLoading}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center">Checkout</h2>

        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary my-4 w-full"
        >
          pay $
        </button>

        {errorMessage && (
          <p className="text-center text-sm text-red-500 mt-2">
            {errorMessage}
          </p>
        )}
      </form>
    </LoadingSpinner>
  );
};

export default CheckoutForm;
