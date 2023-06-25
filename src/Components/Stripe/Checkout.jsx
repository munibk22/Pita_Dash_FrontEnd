import {PaymentElement} from '@stripe/react-stripe-js';

const Checkout = () => {
 const icons = [
  { sizes: '16x16' },
  { sizes: '32x32' },
  { sizes: '64x64' },
  // Add more dictionary entries as needed
];
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default Checkout;