import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../helpers/authStore';

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tech: string;
    budget: number;
    milestones: number;
    filesCount: number;
    status: string
};
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleViewMore = () => {
    if(user?.role === 'wizard'){
      navigate(`/cypher/view-project`, { state: { project } });
    }
    else{
      navigate(`/client/view-project`, { state: { project } });
    }
    
};

  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-black border-opacity-5 w-full text-center text-xs monitor:text-lg cursor-pointer monitor:p-8" onClick={handleViewMore}>
      <p className="w-1/4 truncate font-abhaya text-black">{project.title}</p>
      <p className="w-1/4 truncate font-abhaya text-black">{project.description}</p>
      <p className="w-1/4 truncate font-abhaya text-black">{project.status === 'open' ? 'pending' : project.status}</p>
      <p className="w-1/4 truncate text-orange">${project.budget}</p>
  </div>
  );
};
export default ProjectCard;