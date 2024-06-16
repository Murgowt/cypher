import { FC } from 'react';

export interface ProjectCardProps {
  name: string;
  task: string;
  status: string;
  budget: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, task, status, budget }) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-black border-opacity-5 w-full text-center text-xs monitor:text-md">
      <p className="w-1/4 truncate font-abhaya text-black">{name}</p>
      <p className="w-1/4 truncate font-abhaya text-black">{task}</p>
      <p className="w-1/4 truncate font-abhaya text-black">{status}</p>
      <p className="w-1/4 truncate text-orange">{budget}</p>
  </div>
  );
};
export default ProjectCard;