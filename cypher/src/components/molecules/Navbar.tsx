import { FC, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import BrandLogo from '../atoms/BrandLogo';
import NavLink from '../atoms/NavLink';
import ButtonDropdown from '../atoms/ButtonDropdown';

import { CLIENT_SIGNIN, CLIENT_SIGNUP, CYPHER_SIGNIN, CYPHER_SIGNUP, HOME_PAGE } from '../../constants/routes.ui';

import {
  navbarSignupButton,
  navbarSigninButton
} from '../../constants/navbarButtons';

export interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full h-20 px-4 bg-white max-h-24 tablet:px-10 desktop:px-20 bg-white rounded-lg">
      <div className="flex items-center w-full h-full justify-between tablet:gap-8 desktop:gap-20">
        <div>
          <BrandLogo/>
        </div>
        <div className="items-center justify-between hidden w-full tablet:flex desktop:flex">
          <div className="flex items-center tablet:gap-4 desktop:gap-10">
            <NavLink href={HOME_PAGE}>Home</NavLink>
            <NavLink href={CYPHER_SIGNIN}>Find Work</NavLink>
            <NavLink href={CLIENT_SIGNIN}>Request Cypher</NavLink>
          </div>
          <div className="flex items-center tablet:gap-2 desktop:gap-4">
          <ButtonDropdown
              buttonTitle="Sign Up"
              type="secondary"
              dropdownValues={navbarSignupButton}
            />
            <ButtonDropdown
              buttonTitle="Login"
              type="primary"
              dropdownValues={navbarSigninButton}
            />
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
          className={`fixed z-[99] w-[100%] h-screen overflow-hidden p-10 top-0 tablet:hidden desktop:hidden bg-primary ease-in duration-500
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
            <NavLink href={HOME_PAGE}>Home</NavLink>
            <NavLink href={CYPHER_SIGNIN}>Find Work</NavLink>
            <NavLink href={CLIENT_SIGNIN}>Request Wizard</NavLink>
            <NavLink href={CLIENT_SIGNIN}>Client Login</NavLink>
            <NavLink href={CLIENT_SIGNUP}>Client Signup</NavLink>
            <NavLink href={CYPHER_SIGNIN}>Cypher Login</NavLink>
            <NavLink href={CYPHER_SIGNUP}>Cypher Signup</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
