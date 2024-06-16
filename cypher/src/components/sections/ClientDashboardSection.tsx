import { FC } from "react";
import ClientProjects from "../../components/organisms/ClientProjects";
import ActiveProjects from "../../components/organisms/ActiveProjects";
import ProfileCard from "../../components/organisms/ProfileCard";
import PaymentCard from "../../components/organisms/PaymentCard";
import { AllOrdersResponse } from "../../interfaces/apis/client";
import { Order } from "../../interfaces/apis/client";

interface ClientDashboardSectionProps{
    allOrders: AllOrdersResponse;
    recentOrders : Order[];
}

const ClientDashboardSection: FC<ClientDashboardSectionProps> =({ allOrders, recentOrders }) =>{
    return(
        <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
                <div className="col-span-3">
                    <ClientProjects allOrders={allOrders} recentOrders={recentOrders}/>
                </div>
                <div className="col-span-2">
                    <ActiveProjects activeOrders={allOrders.activeOrders} openOrders={allOrders.openOrders}/>
                </div>
                <div className="flex flex-col col-span-2">
                    <ProfileCard/>
                    <PaymentCard completedOrders={allOrders.completedOrders}/>
                </div> 
            </div>
    )
}

export default ClientDashboardSection;