import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../helpers/authStore';

interface ProjectDescriptionCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        filesCount: number;
        paymentStatus: string;
    };
}

const ProjectDescriptionCard: FC<ProjectDescriptionCardProps> = ({ project }) => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const techArray = JSON.parse(project.tech)

    const handleViewMore = () => {
        if(user?.role === 'wizard'){
            navigate(`/cypher/view-project`, { state: { project } });
        }
        else{
            navigate(`/client/view-project`, { state: { project } });
        }
        
    };

    return (
        <div className="p-8 rounded-md bg-white shadow-md font-abhaya">
            <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-sm pb-4 text-secondary">{project.description}</p>
            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    {techArray.map((i:string) => (
                        <span key={i} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                            {i}
                        </span>
                    ))}
                </div>
                <a onClick={handleViewMore} className="text-xs text-primary cursor-pointer">View More</a>
            </div>
        </div>
    );
};

export default ProjectDescriptionCard;
