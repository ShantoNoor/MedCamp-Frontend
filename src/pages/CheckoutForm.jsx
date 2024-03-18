import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { axiosn } from "../hooks/useAxios";

const CheckoutForm = ({ payRef, payClose, update, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    const tid = toast.loading("Paying ...");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      toast.dismiss(tid);
      toast.error(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      toast.dismiss(tid);
      toast.success("Payment Successful");

      const id = toast.loading("Updating, wait ....");
      try {
        const reqBody = {
          _id: update._id,
          payment_status: "paid",
          txid: result.paymentIntent.id,
        };

        await axiosn.put("/registrations", reqBody);
        toast.dismiss(id);
        toast.success("Update Successful");
        refetch();
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        toast.error("Unable to update");
      }
    }

    payClose();
  };

  return (
    <form onSubmit={handleSubmit} ref={payRef}>
      <PaymentElement />
      <button type="submit" style={{ display: "none" }}>
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
