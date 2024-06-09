import { FC } from "react";
import HeroSection from "../components/organisms/HeroSection";
import TestimonialSection from "../components/sections/TestimonialSection";
import PerfectFitSection from "../components/organisms/PerfectFitSection";
import LandingFooter from "../components/molecules/LandingFooter";
import ClientProjects from "../components/organisms/ClientProjects";
import DashboardNavbar from "../components/molecules/DashboardNavbar";
import Footer from "../components/molecules/Footer";
import ActiveProjects from "../components/organisms/ActiveProjects";
import ProfileCard from "../components/organisms/ProfileCard";
import PaymentCard from "../components/organisms/PaymentCard";

interface HomePageProps {}

const HomePage : FC<HomePageProps> = () =>{
    console.log("HomePage")
    return(

        // <div>
        //     <div className="px-10 py-10 tablet:px-10 tablet:py-12 bg-[url('/images/HeroBackground.png')] bg-no-repeat tablet:bg-contain desktop:px-16">
        //         <HeroSection/>
        //         <PerfectFitSection/>
        //         <TestimonialSection/>
        //     </div>
        //     <LandingFooter/>
        // </div>
        <div className="flex flex-col min-h-screen">
            <DashboardNavbar/>
            <div className="grid grid-cols-1 flex-grow desktop:grid-cols-7 pt-4">
                <div className="col-span-3">
                    <ClientProjects/>
                </div>
                <div className="col-span-2">
                    <ActiveProjects/>
                </div>
                <div className="flex flex-col col-span-2">
                    <ProfileCard/>
                    <PaymentCard/>
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;