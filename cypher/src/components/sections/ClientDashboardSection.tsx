import { FC } from "react";
import ClientProjects from "../../components/organisms/ClientProjects";
import ActiveProjects from "../../components/organisms/ActiveProjects";
import ProfileCard from "../../components/organisms/ProfileCard";
import PaymentCard from "../../components/organisms/PaymentCard";
import { User } from "../../interfaces/User";
import { AllOrdersResponse } from "../../interfaces/apis/client";

interface ClientDashboardSectionProps{
    user: User;
    allOrders: AllOrdersResponse;
}

const ClientDashboardSection: FC<ClientDashboardSectionProps> =({ user, allOrders }) =>{
    return(
        <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
                <div className="col-span-3">
                    <ClientProjects allOrders={allOrders}/>
                </div>
                <div className="col-span-2">
                    <ActiveProjects activeOrders={allOrders.activeOrders}/>
                </div>
                <div className="flex flex-col col-span-2">
                    <ProfileCard user={user}/>
                    <PaymentCard/>
                </div>
                
            </div>
    )
}

export default ClientDashboardSection;