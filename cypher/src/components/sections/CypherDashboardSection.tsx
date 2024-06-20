import { FC } from "react";
import RecentProjects from "../organisms/RecentProjects";
import ProfileCard from "../organisms/ProfileCard";
import PaymentCard from "../organisms/PaymentCard";
import { AllOrdersResponse } from "../../interfaces/apis/clientapis";
import { Order } from "../../interfaces/apis/clientapis";
import ViewClientsCard from "../organisms/ViewClientsCard";
import ViewBidsCard from "../organisms/ViewBidsCard";

interface CypherDashboardSectionProps {
  allOrders: AllOrdersResponse;
  recentOrders: Order[];
}

const CypherDashboardSection: FC<CypherDashboardSectionProps> = ({ allOrders, recentOrders }) => {
  return (
    <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
      <div className="col-span-3">
        <RecentProjects allOrders={allOrders} recentOrders={recentOrders} />
      </div>
      <div className="col-span-2 flex flex-col">
        <div className="flex-grow h-[40vh]">
          <ViewClientsCard activeOrders={allOrders.activeOrders}/>
        </div>
        <div className="flex-grow h-[40vh]">
          <ViewBidsCard activeOrders={allOrders.activeOrders} pendingOrders={allOrders.pendingOrders} />
        </div>
      </div>
      <div className="flex flex-col col-span-2">
        <div className="flex-grow h-[40vh]">
        <ProfileCard />
        </div>
        <div className="flex-grow h-[40vh]">
        <PaymentCard completedOrders={allOrders.completedOrders} />
        </div>
      </div>
    </div>
  );
};

export default CypherDashboardSection;
