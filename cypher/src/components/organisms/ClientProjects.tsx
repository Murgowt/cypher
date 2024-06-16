import { FC } from 'react';
import ProjectCard from '../molecules/ProjectCard';
import ProgressCounts from '../molecules/ProgressCounts';
import { AllOrdersResponse } from '../../interfaces/apis/client';

export interface ClientProjectsProps {
  allOrders: AllOrdersResponse
}

const ClientProjects: FC<ClientProjectsProps> = ({ allOrders }) => {
  let projects = [
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
    { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' }
  ];

  const progressCounts: number[] = [
    allOrders.activeOrders.length + allOrders.completedOrders.length + allOrders.openOrders.length , 
    allOrders.completedOrders.length,
    allOrders.activeOrders.length + allOrders.openOrders.length
  ]

  return (
    <div className="p-2 tablet:pl-10 pb-4">
      <div className="flex justify-between font-abhaya px-10">
        <p className="text-md text-secondary monitor:text-lg">Projects</p>
        <p className="text-sm text-orange monitor:text-md">Manage Projects</p>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md desktop:h-[70vh] monitor:h-[80vh]">
        <ProgressCounts progressCounts={progressCounts}/>
        <div className="flex justify-between items-center px-4 py-2 w-full text-center monitor:p-8">
            <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Project Name</p>
            <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Task</p>
            <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Status</p>
            <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Budget</p>
        </div>
        <div className="flex flex-col">
          <div className="pb-4 grid grid-cols-1 gap-1 tablet:px-1 monitor:gap-4">
            {projects.map((i) => (
              <div key={i.name} className="col-span-1">
                <ProjectCard name={i.name} task={i.task} status={i.status} budget={i.budget} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;