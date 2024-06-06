import { FC, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { Dropdown } from '../../interfaces/DropDown';

export interface ButtonDropdownProps {
  type: 'primary' | 'secondary';
  buttonTitle: string;
  dropdownValues: Dropdown[];
}

const ButtonDropdown: FC<ButtonDropdownProps> = ({
  type,
  buttonTitle,
  dropdownValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="text-sm transition-all duration-500">
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className={`px-4 py-2 w-22 ${isOpen ? 'rounded-t-md' : 'rounded-md'} ${type === 'primary' && 'bg-primary text-white'} ${type === 'secondary' && ' text-primary border border-primary'}`}
        >
          <span className="flex items-end justify-between">
            {`${buttonTitle} `}
            {isOpen ? (
              <IoMdArrowDropup size={18} className="pb-1 pl-1" />
            ) : (
              <IoMdArrowDropdown size={18} className="pb-1 pl-1" />
            )}
          </span>
        </button>
        {isOpen && (
          <div
            className={`absolute left-0 w-full rounded-b-md border border-primary border-t-0 ${type === 'primary' && 'bg-primary'} ${type === 'secondary' && ''}`}
          >
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {dropdownValues.map((dropdown) => {
                return (
                  <li key={dropdown.text}>
                    <Link
                      to={dropdown.link}
                      className={`block px-4 py-2 rounded-b-md text-sm w-22 ${type === 'primary' && 'bg-primary text-white'} ${type === 'secondary' && ' text-primary'}`}
                      onClick={closeDropdown}
                    >
                      {dropdown.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonDropdown;