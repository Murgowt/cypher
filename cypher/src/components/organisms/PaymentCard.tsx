import { FC, useState } from 'react';
import { AllOrdersResponse } from '../../interfaces/apis/clientapis';
import { AiFillLeftSquare } from "react-icons/ai";
import { AiFillRightSquare } from "react-icons/ai";




export interface PaymentCardProps {
  completedOrders: AllOrdersResponse['completedOrders'];
}

const PaymentCard: FC<PaymentCardProps> = ({ completedOrders }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextOrder = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % completedOrders.length);
  };

  const previousOrder = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? completedOrders.length - 1 : prevIndex - 1
    );
  };

  const currentOrder = completedOrders[currentIndex];

  return (
    <div className="p-2 ml-4 tablet:mx-0 tablet:px-8">
      <div className="flex justify-between font-abhaya px-4 monitor:pb-2">
        <p className="text-md text-secondary monitor:text-lg">Payment</p>
        <div className="flex items-center gap-3">
          {completedOrders.length > 1 && (
            <AiFillLeftSquare
              onClick={previousOrder}
              className='text-secondary text-xl cursor-pointer'
            />
          )}
          {completedOrders.length > 1 && (
            <AiFillRightSquare
              onClick={nextOrder}
              className='text-secondary text-xl cursor-pointer'
            />
          )}
        </div>
      </div>
      {completedOrders.length === 0 ? (
        <div className="border-t border-black border-opacity-5 shadow-md bg-white rounded-md h-[215px] flex items-center justify-center monitor:h-[400px]">
          <p className="font-abhaya text-xs text-black monitor:text-md">No payments done yet</p>
        </div>
      ) : (
        <div className="border-t border-black border-opacity-5 shadow-md p-8 bg-white rounded-md h-[215px] monitor:h-[400px]">
          <div className="flex justify-between items-center py-2 w-full">
            <p className="font-abhaya text-sm text-orange pl-10 monitor:text-lg monitor:pt-16">
              {currentOrder.title}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 tablet:px-1 py-4 monitor:pb-16 monitor:gap-6">
            <div className="flex">
              <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-lg">Cypher</p>
              <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-lg">{currentOrder.wizardId.split('_')[1]+' '+currentOrder.wizardId.split('_')[2]}</p>
            </div>
            <div className="flex">
              <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-lg">Payment</p>
              <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-lg">{currentOrder.budget}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;