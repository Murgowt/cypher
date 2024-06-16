import { FC, ReactNode } from 'react';

export interface NavLinkProps {
  href: string;
  children: ReactNode;
  onclick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ href, children, onclick }) => {
  return (
    <a href={href} onClick={onclick}>
      <div className="text-sm transition duration-300 group cursor-pointer">
        {children}
        <span className="block rounded-full max-w-0 tablet:group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary" />
      </div>
    </a>
  );
};

export default NavLink;