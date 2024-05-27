import { FC } from "react";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(
        <div className="font-secondaryFont">
            <h1>Is this abhayaFont too</h1>
        </div>
    )
}

export default HomePage;