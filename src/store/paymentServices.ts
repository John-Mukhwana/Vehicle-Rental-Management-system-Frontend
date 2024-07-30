

// paymentServices.ts
import axios from 'axios';

export const createCheckoutSession = async (amount: number, currency: string, bookingId: number) => {
  const response = await axios.post('https://exotravel-vehicle-rental-management.onrender.com/api/payments/create-checkout-session', {
    amount,
    currency,
    bookingId,
  });

  return response.data;
};
