import { FC } from "react";
import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { validAuthToken } from '../helpers/auth';
import { useAuthStore } from '../store/authStore';
import DashboardNavbar from "../components/molecules/DashboardNavbar";
import Footer from "../components/molecules/Footer";
import { CLIENT_SIGNIN } from '../constants/routes.ui';

interface ClientLayoutProps {}


const ClientLayout: FC<ClientLayoutProps> = () =>{
    const authToken = useAuthStore((state) => state.authToken);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!authToken || !user || (user && user.role !== 'client') || !validAuthToken(authToken!)) {
      logout();
      return <Navigate to={CLIENT_SIGNIN} />;
    }

    return(
        <div className="flex flex-col min-h-screen">
            <DashboardNavbar/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default ClientLayout;