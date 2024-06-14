import { FC } from 'react';

export interface PaymentCardProps {}


const PaymentCard: FC<PaymentCardProps> = () => {
    let details ={ Cypher: 'Jane Cooper', Time: '2 days', Payment: '$20' };
  

  return (
    <div className="p-2 tablet:px-8 pb-4 h-1/2">
        <div className="flex justify-between font-abhaya px-4 monitor:pb-2">
            <p className="text-md text-secondary monitor:text-lg">Payment</p>
        </div>
        <div className="shadow-md p-8 bg-white rounded-md">
            <div className="flex justify-between items-center py-2 w-full">
                <p className="w-1/2 truncate font-abhaya text-xs text-orange pl-10 monitor:text-lg monitor:pt-16">Project Name</p>
            </div>
            <div className="grid grid-cols-1 gap-3 tablet:px-1 py-4 monitor:pb-16">
                {Object.entries(details).map(([key, value]) => (
                    <div key={key} className="flex">
                        <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-md">{key}</p>
                        <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-md">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default PaymentCard;