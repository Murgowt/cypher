import { FC } from 'react';
import CypherButton from "../atoms/CypherButton";
import BrandLogo from '../atoms/BrandLogo';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CONTACT_US_ROUTE } from '../../constants/routes.ui';
import {
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  SOCIAL_LINKEDIN,
} from '../../constants/app';

export interface LandingFooterProps {}



const LandingFooter: FC<LandingFooterProps> = () => {
  const navigate = useNavigate();
  const helperFunction =() =>{
    console.log('contact us button')
    navigate(CONTACT_US_ROUTE)
}

  return (
    <div className="bg-secondary py-8">
        <div className="flex flex-col gap-8 justify-center items-center border-b border-primary pb-8 border-opacity-50 mx-24">
            <p className="text-xs tablet:text-sms font-abhaya font-bold text-white opacity-35">UPSKILL FOR A BETTER FUTURE</p>
            <div className='font-abhaya text-white text-3xl tablet:text-3xl text-center' >
                <h1 className="[text-shadow:_0_2px_0_rgb(0_0_0_/_60%)]">Request More Information</h1>
            </div>
            <div className="text-white desktop:text-md">
                <CypherButton placeHolder= "Contact Us" helperFunction={helperFunction}/>
            </div>
            <p className='text-white text-xs tablet:text-sm'>&copy; 2024 Cypher. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-1 justify-items-center items-center tablet:grid-cols-3 gap-4 desktop:gap-20 mx-24 mt-10">
            <div>
                <BrandLogo/>
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-3 justify-items-center desktop:gap-4 font-abhaya text-white">
                <p>Home</p>
                <p>Find Work</p>
                <p>Request Cypher</p>
            </div>
            <div className="flex items-right gap-2 desktop:gap-4">
                <a
                className="p-2 rounded-md hover:text-primary transition-all duration-200 ease-in-out text-white border border-white border-opacity-50"
                href={SOCIAL_FACEBOOK}
                target="_blank"
                rel="noreferrer"
                aria-label="location"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                className="p-2 rounded-md hover:text-primary transition-all duration-200 ease-in-out text-white  border border-white border-opacity-50"
                href={SOCIAL_LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="location"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                className="p-2 rounded-md hover:text-primary transition-all duration-200 ease-in-out text-white  border border-white border-opacity-50"
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="location"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
        </div>
    </div>
  );
};

export default LandingFooter;
