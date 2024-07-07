import React, { useState, FC } from 'react';
import { useAuthStore } from '../../helpers/authStore';
import { GIVERATING_REQUEST } from '../../services/client';

interface RatingPopUpProps {
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
        completedMilestones: number;
        wizardId: string;
    };
}

const RatingPopUp: FC<RatingPopUpProps> = ({ isOpen, onClose, project }) => {
    const [rating, setRating] = useState<number | null>(null);
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
    };

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (rating === null) {
            alert("Please select a rating before submitting.");
            return;
        }
        const result = await GIVERATING_REQUEST({rating: rating, wizardId: project.wizardId}, authToken!, user!.role);
        if(result === 'OK'){
            onClose();
        } else {
            alert("Something went wrong.");
        }
    };

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="text-center bg-white w-[40%] py-5 relative rounded-md font-abhaya" onClick={handlePopupClick}>
                <div className='flex justify-center items-center gap-2'>
                    <h2 className="text-xl font-bold text-secondary mb-4">Feedback</h2>
                </div>
                <div className="flex justify-center items-center gap-4 p-8 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`text-3xl ${rating! >= star ? 'text-secondary' : 'text-purple'}`}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <button className="bg-secondary text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default RatingPopUp;
