import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";
import LandingFooter from "../components/molecules/LandingFooter";
interface AuthLayoutProps {}


const AuthLayout: FC<AuthLayoutProps> = () =>{
    return(
        <>
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="mt-20">
                <Outlet/>
            </div>
        </div>
        <div>
            <LandingFooter/>
        </div>
        </>
    )
}

export default AuthLayout;