import { FC } from "react";
import Image from "../atoms/Image";
import CypherButton from "../atoms/CypherButton";

import { aboutUsDetails } from '../../constants/properties';
import AboutUsCard from '../molecules/AboutUsCard';
interface HeroSectionProps{}

const HeroSection:FC<HeroSectionProps> =()=>{
    let BannerPath = '/images/banner.png';
    const helperFunction =() =>{
        console.log("Clicked on Helper Function.")
    }
    return(
        <div className="pb-16">
            <div className='flex flex-row justify-center grid grid-cols-1 py-10 tablet:p-8 desktop:p-12 pb-16 gap-4 tablet:grid-cols-2 desktop:grid-cols-2'>
                <div className="flex flex-col justify-center">
                    <div className="text-3xl font-abhaya font-extrabold text-secondary tablet:text-3xl desktop:text-xxl">Join Cypher Today!</div>
                    <div className='font-abhaya py-10 pr-[20%]  text-secondary desktop:text-lg ' >
                        <p >Your search for a certified Software professional ends here!!
                    Cypher has got the best of the lot who go through a rigirous testing process before they are ready to cater to your needs.</p>
                    </div>
                    <div className="text-white desktop:text-md">
                        <CypherButton placeHolder= "Browse our verified coders now!" helperFunction={helperFunction}/>
                    </div>
                </div>
                <div className="flex">
                    <Image path={BannerPath} altText={'Banner'}/>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg w-full">
                <div className="flex items-center">
                    <div className="flex flex-col gap-4">
                        <div className="py-4 px-4 grid grid-cols-1 gap-10 tablet:px-1 tablet:grid-cols-3 tablet:gap-10 desktop:gap-32 monitor:gap-40">
                        { aboutUsDetails.map((card) => (
                            <div key={card.title} className="col-span-1">
                            <AboutUsCard icon={<card.img />} title={card.title} info={card.info}/>
                            </div>
                        ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeroSection;