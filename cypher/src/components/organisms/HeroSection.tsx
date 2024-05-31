import { FC } from "react";
import Image from "../atoms/Image";
import CypherButton from "../atoms/CypherButton";
interface HeroSectionProps{}

const HeroSection:FC<HeroSectionProps> =()=>{
    let BannerPath = '/images/banner.png';
    const helperFunction =() =>{
        console.log("Clicked on Helper Function.")
    }
    return(
        <div className='flex flex-row justify-center grid grid-cols-1 py-10 gap-4 tablet:grid-cols-2 desktop:grid-cols-2'>
            <div className="flex flex-col justify-center">
                <div className="text-3xl  font-extrabold  text-secondary tablet:text-3xl desktop:text-xxl">Join Cypher Today!</div>
                <div className='py-10 pr-[20%]  text-secondary desktop:text-lg ' >
                    <p >Your search for a certified Software professional ends here!!
                Cypher has got the best of the lot who go through a rigirous testing process before they are ready to cater to your needs.</p>
                </div>
                <div className="text-white desktop:text-lg">
                    <CypherButton placeHolder= "Browse our Verified coders now!" helperFunction={helperFunction}/>
                </div>
            </div>
            <div className="flex">
                <Image path={BannerPath} altText={'Banner'}/>
            </div>
                
        </div>
    )
}
export default HeroSection;