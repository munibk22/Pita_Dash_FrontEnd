import React, { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import {clearCart} from '../Redux/cartSlice';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({handleCheckout,amount,handleToggle,customer,options}) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('MUNIB22@GMAIL.COM');
  const [email, setEmail] = useState(customer.email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const paymentModal = document.getElementById('my-dialog');
  const icons = [
    { sizes: '16x16' },
    { sizes: '32x32' },
    { sizes: '64x64' },
    // Add more dictionary entries as needed
  ];

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    const mountEmail = ()=>{
      if(customer.email){
        let emailAddress = customer.email ? customer.email : "youremail@email.com";
          // Create the Link Authentication Element with the defaultValues option
      const linkAuthenticationElement = elements.create("linkAuthentication", {defaultValues: {email:emailAddress}});

      // Mount the Link Authentication Element to its corresponding DOM node
      linkAuthenticationElement.mount("#link-authentication-element");
        console.log(customer.email);
      }
    }
    mountEmail()
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          // setTimeout(test,9000)
          // setMessage("Payment succeeded!");
          console.log(paymentIntent.status);
          break;
        case "processing":
          console.log(paymentIntent.status);
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.log(paymentIntent.status);
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          console.log(paymentIntent.status);
          setMessage("Something went wrong.");
          break;
      }
    }).then(()=>mountEmail());
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://www.pitadash.com",
        
      },
      redirect: 'if_required',
    },)
    .then((result)=>{
      console.log(result)
      if(result.error){
        console.log("ERROR From Stripe")
        // paymentModal.removeAttribute('open');
       
        handleCheckout();        
        toast.error(`Payment was not successfull, ${result.error.message}`,{
          position: toast.POSITION.TOP_CENTER,
          autoClose:4000,
        })
      }else {
        console.log("DONE From Stripe")
        // paymentModal.removeAttribute('open');
        handleCheckout();
        toast.success(`Payment in the amount $${amount} was successfull!`,{
          position: toast.POSITION.TOP_CENTER,
          autoClose:3000,
        })
        handleToggle();
        dispatch(clearCart());
      }
  });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type && error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

    // Create the Link Authentication Element with the defaultValues option
  // const linkAuthenticationElement = elements.create("linkAuthentication", {defaultValues: {email: "foo@bar.com"}});
  // const {clientSecret, loader}=options
  // const linkAuthenticationElement = elements.create({clientSecret, loader});


// Mount the Link Authentication Element to its corresponding DOM node
// linkAuthenticationElement.mount("#link-authentication-element");


  return (
    <form id="payment-form" onSubmit={handleSubmit} className="stripe-form ">
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(customer.email)}      
           />
       <h3>Enter Payment Details - Total Amount ${amount}</h3>
      <PaymentElement id="payment-element"  />
      <button disabled={isLoading || !stripe || !elements} id="submit"className="stripe-button">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}