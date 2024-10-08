import { FC, useEffect, useState } from 'react';
import { ACCEPTBID_REQUEST, VIEWBIDS_REQUEST } from '../../services/client';
import { useAuthStore } from '../../helpers/authStore';
import { Bid } from '../../interfaces/apis/clientapis';
import ChatWindow from '../../components/organisms/ChatWindow';
import { useNavigate } from 'react-router-dom';
import { PAYMENTS_PAGE } from '../../constants/routes.ui';
import { IoMdStar } from "react-icons/io";
import { PiChatCircleDotsThin } from "react-icons/pi";

export interface BidsListProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        status: string;
        wizardId: string;
    };
}

const BidsList: FC<BidsListProps> = ({ project }) => {
    const [bids, setBids] = useState<Bid[]>([]);
    const [chat, setChat] = useState(false);
    const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
    const [acceptingBidId, setAcceptingBidId] = useState<string | null>(null);
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const imgPath = '/images/ProfilePhoto.png';
    const navigate = useNavigate();

    const handleChat = (bid: Bid) => {
        setSelectedBid(bid);
        setChat(true);
    };

    const handleAccept = async (bid: Bid) => {
        setAcceptingBidId(bid.id);
        try {
            await ACCEPTBID_REQUEST(bid, authToken!, user!.role);
            navigate(PAYMENTS_PAGE, { state: { success: true }, replace: true });
        } catch (error) {
            navigate(PAYMENTS_PAGE, { state: { success: true }, replace: true });
        } finally {
            setAcceptingBidId(null);
        }
    };

    const handleBack = () => {
        setChat(false);
        setSelectedBid(null);
    };

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await VIEWBIDS_REQUEST(project.id, authToken!, user?.role!);
                if (Array.isArray(response.data.bids)) {
                    setBids(response.data.bids);
                } else {
                    console.error('Expected an array of bids but received:', response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBids();
    }, [project.id, authToken, user?.role]);

    if (chat && selectedBid) {
        return (
            <ChatWindow
                clientId={user!.id}
                projectId={project.id}
                cypherId={selectedBid.wizardId}
                isClient={true}
                disabled={false}
                placeholder='Start typing...'
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="p-4 shadow-md desktop:h-[600px]">
            <h2 className="text-lg font-abhaya text-secondary mb-4">Bids</h2>
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            {bids.length === 0 ? (
                <p className="flex justify-center items-center h-3/4 font-abhaya text-sm text-secondary">No bids yet</p>
            ) : (
                bids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                            <img src={imgPath} alt="Profile Image" className="w-12 h-12 rounded-md" />
                            <div>
                                <h3 className="text-sm font-abhaya text-secondary">{bid.wizardId.split('_')[1] + ' ' + bid.wizardId.split('_')[2]}</h3>
                                <p className="text-xs font-abhaya text-secondary">${bid.budget}</p>
                                <div className="flex items-center">
                                    <IoMdStar className="text-yellow" />
                                    <p className="text-xs font-abhaya text-secondary ml-1">{bid.wizardRating}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2 text-xs">
                            <PiChatCircleDotsThin className="text-2xl ml-auto text-secondary" onClick={() => handleChat(bid)} />
                            <button 
                                className="border border-secondary text-secondary px-3 py-1 rounded font-abhaya disabled:opacity-50"
                                onClick={() => handleAccept(bid)}
                                disabled={acceptingBidId === bid.id}
                            >
                                {acceptingBidId === bid.id ? 'Accepting...' : 'Accept'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BidsList;