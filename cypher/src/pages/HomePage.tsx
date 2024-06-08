import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import PerfectFitSection from "../components/organisms/PerfectFitSection";
import LandingFooter from "../components/molecules/LandingFooter";
import ClientProjects from "../components/organisms/ClientProjects";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(

        <div>
            <div className="px-10 py-10 tablet:px-10 tablet:py-12 bg-[url('/images/HeroBackground.png')] bg-no-repeat tablet:bg-contain desktop:px-16">
                <HeroSection/>
                <PerfectFitSection/>
                <TestimonialSection/>
            </div>
            <LandingFooter/>
        </div>
    )
}

export default HomePage;