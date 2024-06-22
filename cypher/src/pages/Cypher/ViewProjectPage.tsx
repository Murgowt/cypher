import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CypherProjectDetails from '../../components/organisms/CypherProjectDetails';
import { CLIENT_DASHBOARD, CYPHER_DASHBOARD } from '../../constants/routes.ui';
import { useAuthStore } from '../../helpers/authStore';
import ClientProjectDetails from '../../components/organisms/ClientProjectDetails';
import BidsList from '../../components/organisms/BidsList';
import ChatWindow from '../../components/organisms/ChatWindow';

export interface ViewProjectPageProps {}

const ViewProjectPage: FC<ViewProjectPageProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

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

    return (
        <div className="px-4 tablet:px-20">
            <div className="grid desktop:grid-cols-3 gap-6 py-8">
                <div className="col-span-1 desktop:col-span-2">
                    {user?.role === 'wizard' ? (
                        <CypherProjectDetails key={project.id} project={project} />
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
                        />
                    ) : project.status === 'open' ? (
                        <BidsList project={project} />
                    ) : (
                        <ChatWindow
                            clientId={user!.id}
                            projectId={project.id}
                            cypherId={project.wizardId}
                            isClient={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProjectPage;
