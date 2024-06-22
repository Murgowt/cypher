import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectDetails from '../../components/organisms/ProjectDetails';
import ChatWindow from '../../components/organisms/ChatWindow';
import { CYPHER_DASHBOARD } from '../../constants/routes.ui';
import { useAuthStore } from '../../helpers/authStore';



interface ViewProjectPageProps {}
const ViewProjectPage: FC<ViewProjectPageProps> = () => {
    const user = useAuthStore((state) => state.user);
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !location.state.project) {
            navigate(CYPHER_DASHBOARD);
        }
    }, [location, navigate]);

    if (!location.state || !location.state.project) {
        return null;
    }
    const project = location.state.project;
    console.log(project)
    return (
                <div className="px-20">
                    <div className="grid grid-cols-3 gap-6 py-8">
                    <div className="col-span-2">
                        <ProjectDetails key={project.id} project={project} />
                        </div>
                        <div className="col-span-1">
                        <ChatWindow clientId={project.clientId} projectId={project.id} cypherId={user.id} isClient={false} />
                        </div>
                    </div>  
                </div>
)};

export default ViewProjectPage;