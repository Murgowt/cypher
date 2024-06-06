import { FC } from "react";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {}


const DefaultLayout: FC<DefaultLayoutProps> = () =>{
    console.log("Default Layout")
    return(
        <div className="bg-white">

            <Outlet/>
        </div>
    )
}

export default DefaultLayout;