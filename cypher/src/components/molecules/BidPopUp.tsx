import React, { useState, FC } from 'react';
import { PLACE_BID_REQUEST } from '../../services/cypher';
import { useAuthStore } from '../../helpers/authStore';

interface BidPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        status: string;
    };
    onBidSuccess: () => void;
}

const BidPopUp: FC<BidPopUpProps> = ({ isOpen, onClose, project, onBidSuccess }) => {

    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);

    const [bidAmount, setBidAmount] = useState<number>(0);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const calculateAmounts = (amount: number) => {
        const convenienceFee = amount * 0.050;
        const finalAmount = amount - convenienceFee;
        return { convenienceFee, finalAmount };
    };

    const { convenienceFee, finalAmount } = calculateAmounts(bidAmount);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
    };

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleBidAmountChange = (e: any) => {
        const value = e.target.value;
        setBidAmount(Number(value));
    };

    const handleBid = async(e:any) => {
        e.preventDefault();
        const result = await PLACE_BID_REQUEST({"orderId":project.id,"budget":bidAmount}, authToken!, user!.role);
        if(result === 'OK'){
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                onBidSuccess();
            }, 2000);
        }
        else{
            <p>Something went wrong</p>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="text-center bg-white w-[40%] py-5 relative rounded-md font-abhaya" onClick={handlePopupClick}>
                {isSuccess ? (
                    <div className="text-secondary text-md">Bid placed successfully!</div>
                ) : (
                    <>
                        <div className='flex justify-center items-center gap-2'>
                            <h2 className="text-xl font-bold text-secondary mb-4">Bid</h2>
                            <p className="text-secondary text-md mb-4">(Recommended Bid- ${project.budget})</p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-4 mb-4">
                            <label className="block text-secondary mb-2">Bid Amount</label>
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={handleBidAmountChange}
                                className="w-[15%] p-2 border border-grey rounded"
                                min="10"
                                placeholder='#'
                            />
                        </div>

                        <div className="text-secondary mb-4">
                            <p>Convenience Fee - ${convenienceFee.toFixed(2)}</p>
                        </div>
                        <hr className="border-skillPurple mb-4" />
                        <div className="text-secondary mb-4">
                            <p>Final Amount - ${finalAmount.toFixed(2)}</p>
                        </div>
                        <hr className="border-skillPurple mb-4" />
                        <button className="bg-secondary text-white px-4 py-2 rounded" onClick={handleBid}>Bid On Project</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BidPopUp;