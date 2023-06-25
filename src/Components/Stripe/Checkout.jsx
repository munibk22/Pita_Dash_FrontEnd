import {PaymentElement} from '@stripe/react-stripe-js';

const Checkout = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;