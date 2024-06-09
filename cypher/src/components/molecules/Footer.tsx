import { FC } from 'react';

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="py-2">
        <div className="flex justify-center border-t border-black border-opacity-25">
            <p className='text-black text-xs text-opacity-50 py-1'>&copy; 2024 Cypher. All rights reserved.</p>
          </div>
    </div>
  );
};

export default Footer;
