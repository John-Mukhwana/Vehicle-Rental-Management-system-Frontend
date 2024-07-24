
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('your-publishable-key-here');

// const CheckoutForm = ({ bookingId, onPaymentSuccess }: { bookingId: number; onPaymentSuccess: () => void }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) return;

//     setLoading(true);

//     try {
//       // Fetch payment intent client secret from your server
//       const response = await fetch('/api/create-payment-intent', { method: 'POST' });
//       const { clientSecret } = await response.json();

//       // Confirm the payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (error) {
//         setError(error.message || 'An error occurred');
//         setLoading(false);
//         return;
//       }

//       // Update payment details on the server
//       await fetch('/api/update-payment-details', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           paymentId: paymentIntent.id,
//           bookingId,
//           amount: paymentIntent.amount / 100, // Convert to dollars
//           paymentDate: new Date().toISOString(),
//           createdAt: paymentIntent.created,
//           updatedAt: new Date().toISOString(),
//         }),
//       });

//       onPaymentSuccess();
//     } catch (err) {
//       setError('Failed to complete payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <div>{error}</div>}
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing…' : 'Pay'}
//       </button>
//     </form>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm bookingId={1} onPaymentSuccess={() => alert('Payment Successful')} />
//   </Elements>
// );

// export default PaymentPage;
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const [amount, setAmount] = useState('0');
  const [currency, setCurrency] = useState('usd');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!stripe || !elements) return;
  
    try {
      const response = await fetch('http://localhost:8000/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }
  
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
        },
      });
  
      if (error) {
        if (error instanceof Error) {
          toast.error(error.message || 'Payment failed');
        } else {
          toast.error('Payment failed');
        }
        return;
      }
  
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success('Payment successful');
        // Handle successful payment (e.g., redirect or update UI)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Error processing payment');
      } else {
        toast.error('Error processing payment');
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
