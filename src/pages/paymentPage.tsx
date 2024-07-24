// PaymentPage.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/paymentForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PdpzKFb0fqGvKLShGDzqgCoOxMBPViKxjsdTkJXdWZMeJMJtaBcIHytykdTSXLvQWKfCFI9mnW1pvTtNk10oSVD00IYOPldQc');

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Payment Checkout</h1>
        <Elements stripe={stripePromise}>
          {bookingData ? <CheckoutForm/> : <p>No booking data found</p>}
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
