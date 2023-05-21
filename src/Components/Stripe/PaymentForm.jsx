import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {url} from '../utils/AjaxCalls'

const PaymentForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            setError(result.error.message);
        } else {
            const response = await fetch(url+'payment/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: result.token.id,
                    amount: 999,
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                setError('Payment failed');
            }
        }
    };

    return (
     
        <form onSubmit={handleSubmit}>
            <Element />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div>{error}</div>}
            {success && <div>Payment successful</div>}
        </form>
        
    );
};

export default PaymentForm;