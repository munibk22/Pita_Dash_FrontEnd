import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {url} from '../utils/AjaxCalls'
import { useSelector } from "react-redux";

  // const stripePromise = loadStripe("pk_test_51Ir9CYBbKPDTbStSEP3nWgJPTtqXvsCs52VwZIRi4dN1YV8zpdf54HtpTHCVrE49JGrel5ftRh423Y4kKUiLAqH400uIDCTF79");
  const stripePromise = loadStripe("pk_live_51Ir9CYBbKPDTbStS9MNHhAQ5SukiFbASeC3JrqNoV8kRz0nzXI08Zgl5HS7x1dLLTCQA3RGXVHWt31VAvBKAByGI00sOhlwst0");

// });
function Payment({items,handleCheckout,amount,description,customer,handleToggle,cs}) {
  // const [stripePromise, setStripePromise] = useState(null);
  // const stripePromise = loadStripe("pk_test_51Ir9CYBbKPDTbStSEP3nWgJPTtqXvsCs52VwZIRi4dN1YV8zpdf54HtpTHCVrE49JGrel5ftRh423Y4kKUiLAqH400uIDCTF79");
// const items = useSelector(state => state.cart)  
  const [clientSecret, setClientSecret] = useState(cs);
  console.log(items);
  // useEffect(() => {
    // fetch(url+"payment/config").then(async (r) => {
    //   // const { publishableKey } = await r.json();
    //   const publishableKey  = await r.text();
      // setStripePromise(loadStripe(publishableKey));
      // loadStripe(stripePromise)
    // });
  
    // fetch(url+"payment/create-payment-intent", {
    // headers:{'Content-Type':'application/json'},
    //   method: "POST",
    //   body: JSON.stringify({
    //     items,
    //    amount,
    //    //stripeEmail:"cus_JUFRrOX9q3205v",
    //   stripeEmail:customer.stripeId,
    //    description,
    //   }),
    // }).then(async (result) => {
    //   var {clientSecret}  = await result.json();
    //   setClientSecret(clientSecret);
    // })
    // .catch(error => console.error(error));
  // }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for the optimal loading experience.
  const loader = 'auto';

  const options = {
    clientSecret,
    appearance,
    loader
  };


  return (
    <>
     
      {clientSecret !='' && stripePromise && (
        <Elements stripe={stripePromise} 
        // options={{clientSecret, appearance, loader}}
        options={options}
         key={clientSecret}>
          <CheckoutForm
          handleCheckout={handleCheckout}
          amount={amount}
          handleToggle={handleToggle}
          customer={customer}
          options={options}
          />
        </Elements>
      )}
    </>
  );
}

export default Payment;