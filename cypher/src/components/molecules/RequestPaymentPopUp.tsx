import React, { useState, FC, useEffect } from 'react';
import { useAuthStore } from '../../helpers/authStore';
import { PAYMENT_REQUEST } from '../../services/cypher';

interface RequestPaymentPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

const RequestPaymentPopUp: FC<RequestPaymentPopUpProps> = ({ isOpen, onClose }) => {
    const [paypalId, setPaypalId] = useState('');
    const [message, setMessage] = useState('');
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);

    useEffect(() => {
        setMessage('');
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
    };

    const handlePopupClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await PAYMENT_REQUEST({ wizardId: user!.id, paypalId: paypalId }, authToken!, user!.role);
        if (result === 'Request Placed') {
            setMessage('Payment request sent successfully.');
            setTimeout(() => {
                onClose();
            }, 2000);
        } else {
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
            <div className="text-center bg-white w-[40%] py-5 relative rounded-md font-abhaya h-[250px]" onClick={handlePopupClick}>
                <h2 className="text-xl font-bold text-secondary mb-4">Request Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-secondary text-sm mb-2" htmlFor="paypalId">
                            PayPal ID
                        </label>
                        <input
                            type="text"
                            id="paypalId"
                            value={paypalId}
                            onChange={(e) => setPaypalId(e.target.value)}
                            className="flex items-center justify-center mx-auto border border-secondary text-black text-sm rounded-lg block w-3/4 p-2.5"
                            required
                        />
                    </div>
                    <button className="bg-secondary text-white px-4 py-2 rounded" type="submit">Request Payment</button>
                </form>
                {message && (
                    <p className="text-sm text-secondary mt-2">{message}</p>
                )}
            </div>
            
        </div>
    );
};

export default RequestPaymentPopUp;
