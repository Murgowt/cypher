import { FC } from 'react';
import ActiveProjectsCard from '../molecules/ActiveProjectsCard';
import CypherButton from '../atoms/CypherButton';
import { AllOrdersResponse } from '../../interfaces/apis/client';
import { useNavigate } from 'react-router-dom';
import { POST_WORK } from '../../constants/routes.ui';

export interface ActiveProjectsProps {
  activeOrders: AllOrdersResponse['activeOrders']
}


const ActiveProjects: FC<ActiveProjectsProps> = ({activeOrders}) => {
  const navigate=useNavigate()

  const helperFunction =() =>{
    navigate(POST_WORK)
}

  return (
    <div className="p-2 tablet:pl-8 pb-4">
      <div className="flex justify-between font-abhaya px-4">
        <p className="text-md text-secondary monitor:text-lg">Active Projects</p>
        <p className="text-sm text-orange monitor:text-md">View All</p>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md desktop:h-[70vh] monitor:h-[80vh] overflow-y-auto monitor:py-8">
        <div className="flex justify-between items-center py-2 w-full">
            <p className="w-1/2 truncate font-abhaya text-xs text-secondary pl-10 monitor:text-lg">Project Name</p>
            <p className="w-1/2 truncate font-abhaya text-xs text-secondary text-right pr-16 monitor:text-lg">Status</p>
        </div>
        <div className="flex flex-col">
        {activeOrders.length === 0 ? (
            <p className="text-center text-xs text-black font-abhaya my-10 desktop:h-[40vh]">No active projects found.</p>
          ) : (
            <div className="pb-4 grid grid-cols-1 gap-1 tablet:px-1">
              {activeOrders.map((i) => (
                <div key={i.id} className="col-span-1">
                  <ActiveProjectsCard name={i.title} status={i.status} /> 
                </div>
              ))}
            </div>
          )}
          <div className='sticky bottom-0 bg-white py-2 flex justify-center'>
              <CypherButton placeHolder='Create New Project' helperFunction={helperFunction}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;