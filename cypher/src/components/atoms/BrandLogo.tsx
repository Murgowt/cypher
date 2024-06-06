import { FC } from 'react';

export interface BrandLogoProps { }

const BrandLogo: FC<BrandLogoProps> = ({  }) => {
  return (
      <img
        src="/images/BrandLogo.png"
        alt="Cypheryard Logo"
        width={200}
        height={50}
        className="cursor-pointer"
      />
  );
};

export default BrandLogo;