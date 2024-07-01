import { FC, useEffect, useState } from 'react';
import { VIEWBIDS_REQUEST } from '../../services/client';
import { useAuthStore } from '../../helpers/authStore';
import { Bid } from '../../interfaces/apis/clientapis';
import ChatWindow from '../../components/organisms/ChatWindow';
import { useNavigate } from 'react-router-dom';
import { PAYMENTS_PAGE } from '../../constants/routes.ui';

export interface BidsListProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: string;
        status: string;
        wizardId: string;
    };
}

const BidsList: FC<BidsListProps> = ({ project }) => {
    const [bids, setBids] = useState<Bid[]>([]);
    const [chat, setChat] = useState(false);
    const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const chatImgPath = '/images/Chat.png';
    const imgPath = '/images/ProfilePhoto.png';
    const navigate = useNavigate();

    const handleChat = (bid: Bid) => {
        setSelectedBid(bid);
        setChat(true);
    };

    const handleAccept = (bid: Bid) => {
        setSelectedBid(bid);
        navigate(PAYMENTS_PAGE, { state: { bid }, replace: true });
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
        <div className="p-4 shadow-md">
            <h2 className="text-lg font-abhaya text-secondary mb-4">Bids</h2>
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            {bids.map((bid, index) => (
                <div key={index} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <img src={imgPath} alt="Profile Image" className="w-12 h-12 rounded-md" />
                        <div>
                            <h3 className="text-sm font-abhaya text-secondary">{bid.wizardId.split('-')[1]}</h3>
                            <p className="text-xs font-abhaya text-secondary">${bid.budget}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 text-xs">
                        <img src={chatImgPath} alt="Chat Icon" className="w-8 h-8 rounded-md ml-auto" onClick={() => handleChat(bid)} />
                        <button className="border border-secondary text-secondary px-3 py-1 rounded font-abhaya" onClick={() => handleAccept(bid)}>Accept</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BidsList;
