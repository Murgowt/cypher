import React from 'react';
import { useLocation } from 'react-router-dom';
import PayPalButton from '../../components/organisms/PayPalButton';
import { Bid } from '../../interfaces/apis/clientapis';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const bid: Bid = location.state.bid;

  return (
    <div className="p-4 shadow-md">
      <h2 className="text-lg font-abhaya text-secondary mb-4">Payment</h2>
      <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
      <PayPalButton bid={bid} />
    </div>
  );
};

export default PaymentPage;
