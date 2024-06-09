import { FC } from "react";
import DashboardNavbar from "../components/molecules/DashboardNavbar";
import Footer from "../components/molecules/Footer";
import { Outlet } from "react-router-dom";

interface ClientLayoutProps {}


const ClientLayout: FC<ClientLayoutProps> = () =>{
    return(
        <div className="flex flex-col min-h-screen">
            <DashboardNavbar/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default ClientLayout;