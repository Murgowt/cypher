import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(
        <div className="px-10 ">
            <HeroSection/>
        </div>
    )
}

export default HomePage;