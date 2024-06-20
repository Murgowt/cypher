import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectDetails from '../../components/organisms/ProjectDetails';

interface ViewProjectPageProps {}

const ViewProjectPage: FC<ViewProjectPageProps> = () => {


    let location = useLocation();
    const project = location.state.project;

    return (
                <div className="px-20">
                    <div className="grid grid-cols-3 gap-6 py-8">
                    <div className="col-span-2">
                        <ProjectDetails key={project.id} project={project} />
                        </div>
                        <div className="col-span-1">
                        {/* <ProjectDetails key={project.id} project={project} /> */}
                        </div>
                    </div>  
                </div>
)};

export default ViewProjectPage;
