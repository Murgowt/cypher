import React, { useEffect, useRef, useCallback } from 'react';
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
  const navigate = useNavigate();

  const handleCreateOrder = useCallback(async () => {
    try {
      return await CREATEORDER_REQUEST(authToken!, user!.role);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }, []);

  const handleApprove = useCallback(async (data: any) => {
    try {
      await ACCEPTBID_REQUEST(data, bid, authToken!, user!.role);
      navigate(-1)
    } catch (error) {
      console.error('Error approving payment:', error);
      throw error;
    }
  }, [bid]);

  useEffect(() => {
    if (paypalRef.current && !buttonRendered.current && (window as any).paypal) {
      buttonRendered.current = true;
      (window as any).paypal.Buttons({
        createOrder: handleCreateOrder,
        onApprove: handleApprove,
      }).render(paypalRef.current);
    }
  }, [handleCreateOrder, handleApprove]);

  return <div ref={paypalRef}></div>;
};

export default React.memo(PayPalButton);