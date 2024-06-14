import { FC, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Image from "../atoms/Image";
import BrandLogo from '../atoms/BrandLogo';
import NavLink from '../atoms/NavLink';

import { CLIENT_SIGNIN, HOME_PAGE } from '../../constants/routes.ui';
import CypherButton from '../atoms/CypherButton';

export interface DashboardNavbarProps {}

const DashboardNavbar: FC<DashboardNavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const helperFunction =() =>{
    console.log("Clicked on Helper Function.")
  }

  let ProfilePath='/images/ProfilePhoto.png'

  return (
    <div className="w-full h-20 px-4 bg-white max-h-24 tablet:px-10 desktop:px-20 py-12 bg-white rounded-lg">
      <div className="flex items-center w-full h-full justify-between tablet:gap-8 desktop:gap-20">
        <div>
          <BrandLogo/>
        </div>
        <div className="items-center justify-between hidden w-full tablet:flex desktop:flex">
          <div className="flex items-center tablet:gap-4 desktop:gap-10">
            {/* TODO: Change href attributes */}
            <NavLink href={HOME_PAGE}>Dashboard</NavLink>
            <NavLink href={HOME_PAGE}>Post Work</NavLink>
            <NavLink href={HOME_PAGE}>Manage Projects</NavLink>
          </div>
          <div className="flex items-center tablet:gap-8">
            <NavLink href={CLIENT_SIGNIN}>
            <CypherButton placeHolder='Log Out' helperFunction={helperFunction}/>
            </NavLink>
            
            <Image path={ProfilePath} altText={'Profile Photo'}/>
          </div>
        </div>
        <button
          type="button"
          onClick={handleMenuClick}
          aria-label="menu button"
          className={`cursor-pointer tablet:hidden desktop:hidden ${
            menuOpen ? 'hidden' : ''
          }`}
        >
          <AiOutlineMenu size={28} className="text-secondary" />
        </button>
        <div
          className={`fixed z-[99] w-[100%] h-screen overflow-hidden p-10 top-0 tablet:hidden desktop:hidden bg-white ease-in duration-500
					${menuOpen ? 'left-0' : 'left-[100%] opacity-0'}`}
        >
          <div className="flex items-center justify-end w-full">
            <button
              type="button"
              onClick={handleMenuClick}
              aria-label="menu button"
              className="cursor-pointer"
            >
              <AiOutlineClose size={28} className="text-black" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <NavLink href={HOME_PAGE}>Dashboard</NavLink>
            <NavLink href={HOME_PAGE}>Post Work</NavLink>
            <NavLink href={HOME_PAGE}>Manage Projects</NavLink>
            <CypherButton placeHolder='Log Out' helperFunction={helperFunction}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
