import React, { useState, FC } from 'react';
import { PLACE_BID_REQUEST } from '../../services/cypher';
import { useAuthStore } from '../../helpers/authStore';

interface RatingPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

const RatingPopUp: FC<RatingPopUpProps> = ({ isOpen, onClose }) => {


    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
    };

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };



    const handleBid = async(e:any) => {
        e.preventDefault();
        // const result = await PLACE_BID_REQUEST({"orderId":project.id,"budget":bidAmount}, authToken!, user!.role)
        // if(result === 'OK'){
        //     onClose();
        // }
        // else{
        //     <p>Something went wrong</p>
        // }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="text-center bg-white w-[40%] py-5 relative rounded-md font-abhaya" onClick={handlePopupClick}>
                <div className='flex justify-center items-center gap-2'>
                    <h2 className="text-xl font-bold text-secondary mb-4">Bid</h2>
                    <p className="text-secondary text-md mb-4">(Recommended Bid)</p>
                </div>
                
                <div className="flex justify-center items-center gap-4 mb-4">
                    <label className="block text-secondary mb-2">Bid Amount</label>
                </div>

                <div className="text-secondary mb-4">
                    <p>Convenience Fee</p>
                </div>
                <hr className="border-skillPurple mb-4" />
                <div className="text-secondary mb-4">
                    <p>Final Amount</p>
                </div>
                <hr className="border-skillPurple mb-4" />
                <button className="bg-secondary text-white px-4 py-2 rounded" onClick={handleBid}>Bid On Project</button>
            </div>
        </div>
    );
};

export default RatingPopUp;

