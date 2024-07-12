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
      <div className="flex flex-col justify-between col-span-2 h-[600px] monitor:h-[1150px]">
          <ViewClientsCard activeOrders={allOrders.activeOrders}/>
          <ViewBidsCard activeOrders={allOrders.activeOrders} pendingOrders={allOrders.pendingOrders} />
      </div>
      </div>
      <div className="flex flex-col justify-between col-span-2 h-[600px] monitor:h-[1150px]">
        <ProfileCard />
        <PaymentCard completedOrders={allOrders.completedOrders} />
      </div>
    </div>
  );
};

export default CypherDashboardSection;
