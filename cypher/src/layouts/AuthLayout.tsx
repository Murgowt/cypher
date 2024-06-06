import { FC } from "react";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {}


const AuthLayout: FC<AuthLayoutProps> = () =>{
    return(
        <div className="">
            <h1>AUthLAYOUT</h1>
            <Outlet/>
        </div>
    )
}

export default AuthLayout;