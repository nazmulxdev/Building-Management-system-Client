import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  );
};

export default CheckoutPage;
