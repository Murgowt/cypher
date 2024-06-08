import { FC } from 'react';

export interface ProjectCardProps {
  name: string;
  task: string;
  status: string;
  budget: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, task, status, budget }) => {
  return (
    <div className="flex justify-between items-center gap-32 p-4 rounded-lg shadow-md">
      <p className="truncate font-abhaya text-sm text-black">{name}</p>
      <p className="truncate font-abhaya text-sm text-black">{task}</p>
      <p className="truncate font-abhaya text-sm text-black">{status}</p>
      <p className="truncate text-sm text-primary">{budget}</p>
  </div>
  );
};
export default ProjectCard;