
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
    paymentId: number;
    userId: number;
    bookingId: number;
    amount: string;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
}

const UserPayments: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const userString = localStorage.getItem('user');
                
                if (!token || !userString) {
                    setError('User not authenticated');
                    setLoading(false);
                    return;
                }

                const parsedUser = JSON.parse(userString);
                const userId = parsedUser.user?.userId;

                if (!userId) {
                    setError('User not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8000/api/payments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Filter payments to only include those for the current user
                const userPayments = response.data.filter((payment: Payment) => payment.userId === userId);

                setPayments(userPayments);
            } catch (error) {
                setError('Failed to fetch payments');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Completed':
                return 'bg-green-500 text-white';
            case 'Failed':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (payments.length === 0) return <p>You haven't made any payments yet.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Payments</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 border-b text-left">Payment ID</th>
                        <th className="py-3 px-4 border-b text-left">Booking ID</th>
                        <th className="py-3 px-4 border-b text-left">Amount</th>
                        <th className="py-3 px-4 border-b text-left">Payment Date</th>
                        <th className="py-3 px-4 border-b text-left">Payment Method</th>
                        <th className="py-3 px-4 border-b text-left">Transaction ID</th>
                        <th className="py-3 px-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.paymentId} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border-b">{payment.paymentId}</td>
                            <td className="py-3 px-4 border-b">{payment.bookingId}</td>
                            <td className="py-3 px-4 border-b">{payment.amount}</td>
                            <td className="py-3 px-4 border-b">{formatDate(payment.paymentDate)}</td>
                            <td className="py-3 px-4 border-b">{payment.paymentMethod}</td>
                            <td className="py-3 px-4 border-b">{payment.transactionId}</td>
                            <td className="py-3 px-4 border-b">
                                <span className={`inline-block px-3 py-1 rounded-full ${getStatusColor(payment.paymentStatus)}`}>
                                    {payment.paymentStatus}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPayments;