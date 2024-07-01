import React, { useEffect, useRef } from 'react';
import axios from "../../helpers/axios";
import { PAYMENT_ENDPOINT, ACCEPT_BID_ENDPOINT } from '../../constants/endpoints';
import { useAuthStore } from '../../helpers/authStore';

interface PayPalButtonProps {
  bid: {
    id: string;
    budget: string;
    status: string;
    wizardId: string;
    orderId: string;
  };
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ bid }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
  const authToken = useAuthStore((state) => state.authToken);

  useEffect(() => {
    console.log('hi')
    if (paypalRef.current) {
      (window as any).paypal.Buttons({
        createOrder: async function(data: any, actions: any) {
          try {
            const response = await axios.post(PAYMENT_ENDPOINT, {
              amount: 1
            }, {
              headers: { 'token': authToken, 'user': user!.role },
            });
            console.log('Order created:', response.data);
            return response.data.id;
          } catch (error) {
            console.error('Error creating order:', error);
          }
        },
        onApprove: async function(data: any, actions: any) {
          try {
            const acceptBidResponse = await axios.post(ACCEPT_BID_ENDPOINT, {
              paymentId: data.orderID,
              bidId: bid.id,
              wizardId: bid.wizardId,
              finalBudget: bid.budget,
            }, {
              headers: { 'token': authToken, 'user': user!.role },
            });
            console.log(acceptBidResponse)
          } catch (error) {
            console.error('Error approving payment:', error);
          }
        },
      }).render(paypalRef.current);
    }
  }, [bid]);

  return <div ref={paypalRef}>Hello</div>;
};

export default PayPalButton;
