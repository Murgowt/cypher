import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";

import PerfectFitSection from "../components/organisms/PerfectFitSection";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(
        <div className="px-10 py-10 tablet:px-20 tablet:py-12 bg-[url('/images/HeroBackground.png')] bg-no-repeat tablet:bg-contain">
            <HeroSection/>
            <PerfectFitSection/>
        </div>
    )
}

export default HomePage;