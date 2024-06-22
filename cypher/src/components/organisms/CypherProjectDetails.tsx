import { FC, useState, useEffect } from 'react';
import CypherButton from '../atoms/CypherButton';
import BidPopUp from '../molecules/BidPopUp';
import { useAuthStore } from '../../helpers/authStore';
import { CYPHERORDERS_REQUEST } from '../../services/cypher';
import { CypherOrdersResponse } from '../../interfaces/apis/cypherapis';
import { isAxiosError } from 'axios';
import { ERRORS } from '../../constants/app';

export interface CypherProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string[];
        budget: number;
        milestones: string;
        status: string;
    };
}

const CypherProjectDetails: FC<CypherProjectDetailsProps> = ({ project }) => {
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [toggleOpen, setToggleOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [allOrders, setAllOrders] = useState<CypherOrdersResponse>({ pendingOrders: [], activeOrders: [], completedOrders: [] });

    const handleBid = () => {
        setToggleOpen(true);
    };

    const handleClosePopup = () => {
        setToggleOpen(false);
    };

    useEffect(() => {
        const getDashboardData = async () => {
            if (isAuthenticated) {
                try {
                    const res = await CYPHERORDERS_REQUEST(authToken!, user!.role);
                    if (res.status === 200) {
                        const allOrdersResponse: CypherOrdersResponse = res.data;
                        setAllOrders(allOrdersResponse);
                        setApiError(null);
                    }
                } catch (error) {
                    if (isAxiosError(error)) {
                        const status = error.response?.status;
                        if (status === 401) {
                            setApiError(error.response?.data?.error || error.response?.data?.message || ERRORS.SERVER_ERROR);
                        } else {
                            setApiError(ERRORS.SERVER_ERROR);
                        }
                    } else {
                        setApiError(ERRORS.SERVER_ERROR);
                    }
                }
            } else {
                setApiError(ERRORS.AUTHENTICATION_ERROR);
            }
        };
        getDashboardData();
    });

    const isPendingOrder = allOrders.pendingOrders.some(order => order.id === project.id);

    return (<>
        {apiError ? (
            <p>Something went wrong</p>
          ) : (
            <>
              <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya">
            <div className='flex justify-between'>
                <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                {project.status === 'open' && (
                    <div>
                        {isPendingOrder ? (
                            <div className="flex justify-between items-center px-5 py-2 bg-buttonGrey rounded-sm text-white">
                                <p>Pending</p>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center pb-4">
                                <CypherButton 
                                    placeHolder="Bid On Project"
                                    helperFunction={handleBid}  
                                />
                            </div>
                        )}
                    </div>
                )}
                {project.status === 'active' &&  <div className="flex justify-between items-center px-5 bg-primary rounded-sm text-white">
                    <p>Active</p>
                </div>} 
                {project.status === 'completed' &&  <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                    <p>Completed</p>
                </div>} 
            </div>
            
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-xs pb-4 text-secondary">{project.description}</p>
            
            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex gap-4 flex-wrap pb-4">
                {project.tech.map((skill, index) => (
                    <span key={index} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
            <hr className="my-10 border-t-2 border-black border-opacity-5" />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h3 className="text-md text-secondary pb-4">Attachment</h3>
                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                        {project.budget}
                    </span>
                </div>
                <div>
                    <h3 className="text-md text-secondary pb-4">Budget</h3>
                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                        {project.budget}
                    </span>
                </div>
                <div>
                    <h3 className="text-md text-secondary pb-4">Milestones</h3>
                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                        {project.milestones}
                    </span>
                </div>
            </div>

            <BidPopUp isOpen={toggleOpen} onClose={handleClosePopup} project={project} />
        </div>
            </>
          )}
    </>
        
    );
};

export default CypherProjectDetails;
