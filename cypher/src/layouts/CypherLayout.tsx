import { FC } from "react";
import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { validAuthToken } from '../helpers/auth';
import { useAuthStore } from '../helpers/authStore';
import CypherNavbar from "../components/molecules/CypherNavbar";
import Footer from "../components/molecules/Footer";
import { CYPHER_SIGNIN } from '../constants/routes.ui';

interface CypherLayoutProps {}


const CypherLayout: FC<CypherLayoutProps> = () =>{
    // const authToken = useAuthStore((state) => state.authToken);
    // const user = useAuthStore((state) => state.user);
    // const logout = useAuthStore((state) => state.logout);

    // if (!authToken || !user || (user && user.role !== 'cypher') || !validAuthToken(authToken!)) {
    //   logout();
    //   return <Navigate to={CYPHER_SIGNIN} />;
    // }

    return(
        <div className="flex flex-col min-h-screen">
            <CypherNavbar/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default CypherLayout;