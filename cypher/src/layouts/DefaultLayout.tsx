import { FC } from "react";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {}


const DefaultLayout: FC<DefaultLayoutProps> = () =>{
    console.log("Default Layout")
    return(
        <div className="font-primaryFont bg-white">
            <h1>Is this abhayaFont</h1>
            <Outlet/>
        </div>
    )
}

export default DefaultLayout;