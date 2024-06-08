import { FC, ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  children: ReactNode;
  onclick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ children }) => {
  return (
      <div className="text-sm transition duration-300 group cursor-pointer">
        {children}
        <span className="block rounded-full max-w-0 tablet:group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary" />
      </div>
  );
};

export default NavLink;