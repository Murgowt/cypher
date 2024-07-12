import { FC } from "react";
import Image from "../atoms/Image";
import CypherButton from "../atoms/CypherButton";

import { aboutUsDetails } from '../../constants/properties';
import AboutUsCard from '../molecules/AboutUsCard';
import Navbar from '../molecules/Navbar';
import { useNavigate } from "react-router-dom";
import { CLIENT_SIGNIN } from "../../constants/routes.ui";
interface HeroSectionProps{}

const HeroSection:FC<HeroSectionProps> =()=>{
    let BannerPath = '/images/banner.png';
    const navigate = useNavigate();
    const helperFunction =() =>{
        console.log("Clicked on Helper Function.")
        navigate(CLIENT_SIGNIN)
    }
    return(
        <div className="pb-16 monitor:py-10 monitor:px-20">
            <Navbar/>
            <div className='flex flex-row justify-center grid grid-cols-1 py-10 desktop:p-16 pb-16 gap-4 tablet:grid-cols-2 desktop:grid-cols-2'>
                <div className="flex flex-col justify-center">
                    <div className="text-3xl font-abhaya font-extrabold text-secondary tablet:text-3xl desktop:text-xxl">Join Cypher Today!</div>
                    <div className='font-abhaya py-10 pr-[20%] text-secondary desktop:text-md monitor:text-lg' >
                        <p >Your search for a <b>certified</b> Software professional ends here!! <b>Cyphers are software geeks</b>, the best of the lot who go through a rigirous testing process before they are ready to cater to your needs.</p>
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
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-1 gap-2 tablet:px-1 tablet:grid-cols-3 tablet:gap-4 desktop:gap-32">
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