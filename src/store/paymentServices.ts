

// paymentServices.ts
import axios from 'axios';

export const createCheckoutSession = async (amount: number, currency: string, bookingId: number) => {
  const response = await axios.post('http://localhost:8000/api/payments/create-checkout-session', {
    amount,
    currency,
    bookingId,
  });

  return response.data;
};
