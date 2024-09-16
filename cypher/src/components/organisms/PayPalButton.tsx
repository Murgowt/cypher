import React, { useEffect, useRef, useCallback, useState } from 'react';
import { CREATEORDER_REQUEST, ACCEPTBID_REQUEST } from '../../services/client';
import { useAuthStore } from '../../helpers/authStore';
import { useNavigate } from 'react-router-dom';

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
  const buttonRendered = useRef(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCreateOrder = useCallback(async () => {
    try {
      return await CREATEORDER_REQUEST(authToken!, user!.role);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }, [authToken, user]);

  const handleApprove = useCallback(async () => {
    try {
      await ACCEPTBID_REQUEST(bid, authToken!, user!.role);
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error('Error approving payment:', error);
      throw error;
    }
  }, [bid, authToken, user, navigate]);

  useEffect(() => {
    if (paypalRef.current && !buttonRendered.current && (window as any).paypal) {
      buttonRendered.current = true;
      (window as any).paypal.Buttons({
        createOrder: handleCreateOrder,
        onApprove: handleApprove,
      }).render(paypalRef.current);
    }
  }, [handleCreateOrder, handleApprove]);

  return (
    <div>
      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white px-20 py-6 rounded shadow-lg">
            <p className="text-green text-md font-abhaya">Payment successful!</p>
          </div>
        </div>
      )}
      {!paymentSuccess && <div ref={paypalRef}></div>}
    </div>
  );
};

export default React.memo(PayPalButton);
