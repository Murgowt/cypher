import { FC, useState } from 'react';
import { AllOrdersResponse } from '../../interfaces/apis/clientapis';

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
        <div className="p-2 tablet:px-8 pb-4 h-1/2">
            <div className="flex justify-between font-abhaya px-4 monitor:pb-2">
                <p className="text-md text-secondary monitor:text-lg">Payment</p>
                <div className="flex items-center">
                    <button
                        onClick={previousOrder}
                        className="text-grey hover:text-black font-bold py-2 px-4 rounded-l"
                        disabled={completedOrders.length <= 1}
                    >
                        &lt;
                    </button>
                    <button
                        onClick={nextOrder}
                        className="text-grey hover:text-black font-bold py-2 px-4 rounded-r"
                        disabled={completedOrders.length <= 1}
                    >
                        &gt;
                    </button>
                </div>
            </div>
            {completedOrders.length === 0 ? (
                <div className="shadow-md p-8 bg-white rounded-md">
                    <p className="text-center font-abhaya text-xs text-black monitor:text-md">No payments done yet.</p>
                </div>
            ) : (
                <div className="shadow-md p-8 bg-white rounded-md">
                    <div className="flex justify-between items-center py-2 w-full">
                        <p className="font-abhaya text-sm text-orange pl-10 monitor:text-lg monitor:pt-16">
                            {currentOrder.title}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 tablet:px-1 py-4 monitor:pb-16">
                        <div className="flex">
                            <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-md">Cypher</p>
                            <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-md">{currentOrder.wizardId.split('_')[1]+' '+currentOrder.wizardId.split('_')[2]}</p>
                        </div>
                        <div className="flex">
                            <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-md">Payment</p>
                            <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-md">{currentOrder.budget}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentCard;
