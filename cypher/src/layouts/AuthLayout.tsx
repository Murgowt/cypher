import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";
import LandingFooter from "../components/molecules/LandingFooter";
interface AuthLayoutProps {}


const AuthLayout: FC<AuthLayoutProps> = () =>{
    return(
        <div className="">
            <div className="py-10">
             <Navbar/>
            </div>
            
            <Outlet/>
            <div className="tablet:relative bottom-0 monitor:relative bottom-0 pt-10">
                <LandingFooter/>
            </div>
        </div>
    )
}

export default AuthLayout;