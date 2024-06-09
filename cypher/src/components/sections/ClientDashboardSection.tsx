import { FC } from "react";
import ClientProjects from "../../components/organisms/ClientProjects";
import ActiveProjects from "../../components/organisms/ActiveProjects";
import ProfileCard from "../../components/organisms/ProfileCard";
import PaymentCard from "../../components/organisms/PaymentCard";

interface ClientDashboardSectionProps{}

const ClientDashboardSection: FC<ClientDashboardSectionProps> =() =>{
    return(
        <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
                <div className="col-span-3">
                    <ClientProjects/>
                </div>
                <div className="col-span-2">
                    <ActiveProjects/>
                </div>
                <div className="flex flex-col col-span-2">
                    <ProfileCard/>
                    <PaymentCard/>
                </div>
                
            </div>
    )
}

export default ClientDashboardSection;