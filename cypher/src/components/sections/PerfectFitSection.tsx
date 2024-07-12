import { FC } from "react";
import ImageCard from "../molecules/ImageCard";

interface PerfectFitSectionProps {}

const PerfectFitSection: FC<PerfectFitSectionProps> = () =>{
    let perfectFit1 = '/images/perfectFit1.png';
    let perfectFit2 = '/images/perfectFit2.png';
    let perfectFit3 = '/images/perfectFit3.png';
    return(
        <div>
            <div>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl">
               Find the Perfect Fit
            </h1>
            </div>
            <div className="max-h-fit overflow-hidden py-4 grid grid-cols-1 gap-y-4 gap-10 tablet:grid-cols-3 tablet:gap-10 desktop:gap-32 font-abhaya">
                <ImageCard imgPath={perfectFit1} text="Search by skill to match your project needs with the ideal coder."/>
                <ImageCard imgPath={perfectFit2} text="Find professionals who meet your specific requirements and bring your work to life."/>
                <ImageCard imgPath={perfectFit3} text="Connect with verified coders who deliver quality work within your budget."/>
            </div > 
        </div>
    )
}

export default PerfectFitSection;