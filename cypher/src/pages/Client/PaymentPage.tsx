import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CLIENT_DASHBOARD } from '../../constants/routes.ui';
//import PayPalButton from '../../components/organisms/PayPalButton';
// import { Bid } from '../../interfaces/apis/clientapis';

const PaymentPage: React.FC = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const bid: Bid = location.state?.bid;

  const goToHomepage = () => {
    navigate(CLIENT_DASHBOARD); 
  };

  return (
    <div className="p-10">
      {/* <h2 className="text-lg font-abhaya text-secondary mb-4">Payment</h2> */}
      {/* <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" /> */}
      <div className="flex flex-col justify-center items-center mt-[10%] space-y-4">
        <p>Thanks for accepting the bid, we will reach out to you soon!</p>
        <button 
          className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition-colors"
          onClick={goToHomepage}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;