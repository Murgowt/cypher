import { FC } from 'react';
import ProjectCard from '../molecules/ProjectCard';
import ProgressCounts from '../molecules/ProgressCounts';
import { AllOrdersResponse, Order } from '../../interfaces/apis/clientapis';
import { CLIENT_PROJECTS } from '../../constants/routes.ui';


export interface ClientProjectsProps {
  allOrders: AllOrdersResponse;
  recentOrders: Order[];
}

const RecentProjects: FC<ClientProjectsProps> = ({ allOrders, recentOrders }) => {

  const progressCounts: number[] = [
    allOrders.activeOrders?.length + allOrders.completedOrders?.length + allOrders.pendingOrders?.length,
    allOrders.completedOrders?.length,
    allOrders.activeOrders?.length + allOrders.pendingOrders?.length
  ];

  return (
    <div className="p-2 tablet:pl-10 pb-4">
      <div className="flex justify-between font-abhaya px-10">
        <p className="text-md text-secondary monitor:text-lg">Projects</p>
        <a href={CLIENT_PROJECTS}>
        <p className="text-sm text-orange monitor:text-md">Manage Projects</p>
        </a>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md desktop:h-[70vh] monitor:h-[80vh]">
        <ProgressCounts progressCounts={progressCounts} />
        <div className="flex justify-between items-center px-4 py-2 w-full text-center monitor:p-8">
          <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Project Name</p>
          <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Task</p>
          <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Status</p>
          <p className="w-1/4 truncate font-abhaya text-xs text-secondary monitor:text-lg">Budget</p>
        </div>
        <div className="flex flex-col">
          <div className="pb-4 grid grid-cols-1 gap-1 tablet:px-1 monitor:gap-4">
            {recentOrders.length === 0 ? <div className="flex justify-center p-3 w-full text-xs mt-20 monitor:text-md">No Projects yet</div>: <></>}
            {recentOrders.map((i) => (
              <div key={i.id} className="col-span-1">
                <ProjectCard name={i.title} task={i.description} status={i.status === 'open' ? 'Pending' : i.status} budget={i.budget} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
