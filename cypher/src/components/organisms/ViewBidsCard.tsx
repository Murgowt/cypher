import { FC } from 'react';
import ActiveProjectsCard from '../molecules/ActiveProjectsCard';
import CypherButton from '../atoms/CypherButton';
import { AllOrdersResponse } from '../../interfaces/apis/clientapis';
import { useNavigate } from 'react-router-dom';
import { FIND_WORK } from '../../constants/routes.ui';

export interface ViewBidsCardProps {
  activeOrders: AllOrdersResponse['activeOrders'],
  pendingOrders: AllOrdersResponse['pendingOrders']
}


const ViewBidsCard: FC<ViewBidsCardProps> = ({activeOrders = [], pendingOrders = []}) => {
  const navigate=useNavigate()

  const helperFunction =() =>{
    navigate(FIND_WORK)
}

  return (
    <div className="p-2 tablet:pl-8 pb-4">
      <div className="flex justify-between font-abhaya px-4">
        <p className="text-md text-secondary monitor:text-lg">My Bids ({[...activeOrders,...pendingOrders].length})</p>
      </div>
      <div className="shadow-md p-5 bg-white rounded-md overflow-y-auto monitor:py-8">
        <div className="flex flex-col">
        {(activeOrders.length === 0 && pendingOrders.length === 0) ? (
            <p className="text-center text-xs text-black font-abhaya my-10">No current bids.</p>
          ) : (
            <div className="pb-4 grid grid-cols-1 gap-1 tablet:px-1">
              {[...activeOrders,...pendingOrders].map((i) => (
                <div key={i.id} className="col-span-1">
                  <ActiveProjectsCard name={i.title} status={i.status} /> 
                </div>
              ))}
            </div>
          )}
          <div className='sticky bottom-0 bg-white py-2 flex justify-center'>
              <CypherButton placeHolder='Place a bid' helperFunction={helperFunction}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBidsCard;