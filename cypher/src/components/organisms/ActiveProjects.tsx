import { FC } from 'react';
import ActiveProjectsCard from '../molecules/ActiveProjectsCard';
import { AllOrdersResponse } from '../../interfaces/apis/clientapis';
import { useNavigate } from 'react-router-dom';
import { CLIENT_PROJECTS, POST_WORK } from '../../constants/routes.ui';

export interface ActiveProjectsProps {
  activeOrders: AllOrdersResponse['activeOrders'],
  pendingOrders: AllOrdersResponse['pendingOrders']
}

const ActiveProjects: FC<ActiveProjectsProps> = ({activeOrders = [], pendingOrders = []}) => {
  const navigate = useNavigate()
  const helperFunction = () => {
    navigate(POST_WORK)
  }

  return (
    <div className="p-2 tablet:pl-8">
      <div className="flex justify-between font-abhaya px-4">
        <p className="text-md text-secondary monitor:text-lg">Active Projects</p>
        <a href={CLIENT_PROJECTS}>
          <p className="text-sm text-orange monitor:text-md">View All</p>
        </a>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md monitor:py-8 desktop:h-[555px] monitor:h-[1100px] flex flex-col">
        <div className="flex justify-between items-center py-2 w-full">
          <p className="w-1/2 truncate font-abhaya text-sm text-secondary pl-10 monitor:text-lg">Project Name</p>
          <p className="w-1/2 truncate font-abhaya text-sm text-secondary text-right pr-16 monitor:text-lg">Status</p>
        </div>
        <div className="flex-1 overflow-y-auto mb-4">
          {(activeOrders.length === 0 && pendingOrders.length === 0) ? (
            <p className="text-center text-sm text-black font-abhaya my-10">No active projects found</p>
          ) : (
            <div className="grid grid-cols-1 gap-1 tablet:px-1">
              {[...activeOrders,...pendingOrders].map((i) => (
                <div key={i.id} className="col-span-1">
                  <ActiveProjectsCard name={i.title} status={i.status} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='mt-auto py-2 flex justify-center'>
          <button className="bg-secondary text-white px-4 py-2 text-sm rounded-lg shadow-lg" onClick={helperFunction}>Create New Project</button>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;