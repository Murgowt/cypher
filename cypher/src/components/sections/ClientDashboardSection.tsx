import { FC } from "react";
import RecentProjects from "../organisms/RecentProjects";
import ActiveProjects from "../../components/organisms/ActiveProjects";
import ProfileCard from "../../components/organisms/ProfileCard";
import PaymentCard from "../../components/organisms/PaymentCard";
import { AllOrdersResponse } from "../../interfaces/apis/clientapis";
import { Order } from "../../interfaces/apis/clientapis";

interface ClientDashboardSectionProps{
    allOrders: AllOrdersResponse;
    recentOrders : Order[];
}

const ClientDashboardSection: FC<ClientDashboardSectionProps> =({ allOrders, recentOrders }) =>{
    return(
        <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
                <div className="col-span-3">
                    <RecentProjects allOrders={allOrders} recentOrders={recentOrders}/>
                </div>
                <div className="col-span-2 overflow-y-auto">
                    <ActiveProjects activeOrders={allOrders.activeOrders} pendingOrders={allOrders.pendingOrders}/>
                </div>
                <div className="flex flex-col col-span-2">
                    <ProfileCard/>
                    <PaymentCard completedOrders={allOrders.completedOrders}/>
                </div> 
            </div>
    )
}

export default ClientDashboardSection;