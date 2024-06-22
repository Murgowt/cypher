import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CypherProjectDetails from '../../components/organisms/CypherProjectDetails';
import { CLIENT_DASHBOARD, CYPHER_DASHBOARD } from '../../constants/routes.ui';
import { useAuthStore } from '../../helpers/authStore';
import ClientProjectDetails from '../../components/organisms/ClientProjectDetails';
import BidsList from '../../components/organisms/BidsList';
import ChatWindow from '../../components/organisms/ChatWindow';
import { CYPHERORDERS_REQUEST } from '../../services/cypher';
import { CypherOrdersResponse } from '../../interfaces/apis/cypherapis';
import { isAxiosError } from 'axios';
import { ERRORS } from '../../constants/app';

export interface ViewProjectPageProps {}

const ViewProjectPage: FC<ViewProjectPageProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [apiError, setApiError] = useState<string | null>(null);
    const [allOrders, setAllOrders] = useState<CypherOrdersResponse>({ pendingOrders: [], activeOrders: [], completedOrders: [] });

    useEffect(() => {
        if (!location.state || !location.state.project) {
            if (user?.role === 'wizard') {
                navigate(CYPHER_DASHBOARD);
            } else {
                navigate(CLIENT_DASHBOARD);
            }
        }
    }, [location, navigate, user]);

    if (!location.state || !location.state.project) {
        return null;
    }

    const project = location.state.project;

    useEffect(() => {
        const getDashboardData = async () => {
            if (isAuthenticated && user?.role === 'wizard') {
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
            }
        };
    
        getDashboardData();
    });
    

    const isPendingOrder = allOrders.pendingOrders.some(order => order.id === project.id);

    let chatWindowPlaceholder = '';
    if (user?.role === 'wizard') {
        if (!isPendingOrder && project.status !== 'completed') {
            chatWindowPlaceholder = 'Bid On Project to Start Chat';
        } else if (project.status === 'completed') {
            chatWindowPlaceholder = 'Order is Closed';
        } else {
            chatWindowPlaceholder = 'Start Typing...';
        }
    } else {
        chatWindowPlaceholder = project.status === 'completed' ? 'Order is Closed' : 'Start Typing...';
    }


    return (
        <div className="px-4 tablet:px-20">
            <div className="grid desktop:grid-cols-3 gap-6 py-8">
                <div className="col-span-1 desktop:col-span-2">
                    {user?.role === 'wizard' ? (
                        <CypherProjectDetails key={project.id} project={project} bidPlaced={isPendingOrder}/>
                    ) : (
                        <ClientProjectDetails key={project.id} project={project} />
                    )}
                </div>
                <div className="col-span-1">
                    {user?.role === 'wizard' ? (
                        <ChatWindow
                            clientId={project.clientId}
                            projectId={project.id}
                            cypherId={user.id}
                            isClient={false}
                            disabled={!isPendingOrder || project.status==='completed'}
                            placeholder={chatWindowPlaceholder}
                        />
                    ) : project.status === 'open' ? (
                        <BidsList project={project} />
                    ) : (
                        <ChatWindow
                            clientId={user!.id}
                            projectId={project.id}
                            cypherId={project.wizardId}
                            isClient={true}
                            disabled={project.status==='completed'}
                            placeholder={chatWindowPlaceholder}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProjectPage;
