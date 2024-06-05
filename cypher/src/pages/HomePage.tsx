import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";
import AboutUsSection from "../components/organisms/AboutUsSection";
import PerfectFitSection from "../components/organisms/PerfectFitSection";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(
        <div className="px-10 ">
            <HeroSection/>
            <AboutUsSection/>
            <PerfectFitSection/>
        </div>
    )
}

export default HomePage;