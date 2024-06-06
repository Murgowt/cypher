import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import PerfectFitSection from "../components/organisms/PerfectFitSection";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(
        <div className="px-10 bg-[url('/images/HeroBackground.png')] bg-no-repeat tablet:p-20 desktop-p-20">
            <HeroSection/>
            <TestimonialSection/>
            <PerfectFitSection/>
            
        </div>
    )
}

export default HomePage;