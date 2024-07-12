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
    <div className="p-2 tablet:pl-10">
      <div className="flex justify-between font-abhaya px-10">
        <p className="text-md text-secondary monitor:text-lg">Projects</p>
        <a href={CLIENT_PROJECTS}>
        <p className="text-sm text-orange monitor:text-md">Manage Projects</p>
        </a>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md desktop:min-h-[555px] monitor:min-h-[1100px]">
        <ProgressCounts progressCounts={progressCounts} />
        <div className="flex justify-between items-center px-4 py-2 w-full text-center monitor:p-8">
          <p className="w-1/4 truncate font-abhaya text-sm text-secondary monitor:text-lg">Project Name</p>
          <p className="w-1/4 truncate font-abhaya text-sm text-secondary monitor:text-lg">Task</p>
          <p className="w-1/4 truncate font-abhaya text-sm text-secondary monitor:text-lg">Status</p>
          <p className="w-1/4 truncate font-abhaya text-sm text-secondary monitor:text-lg">Budget</p>
        </div>
        <div className="flex flex-col">
          <div className="pb-4 grid grid-cols-1 gap-2 tablet:px-1 monitor:gap-6">
            {recentOrders.length === 0 ? <div className="flex justify-center p-3 w-full text-sm mt-20 monitor:text-lg">No Projects yet</div>: <></>}
            {recentOrders.map((i) => (
              <div key={i.id} className="col-span-1">
                <ProjectCard project={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
