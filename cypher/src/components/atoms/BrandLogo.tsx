import { FC } from 'react';
import { HOME_PAGE } from '../../constants/routes.ui';
import { useNavigate } from 'react-router-dom';

export interface BrandLogoProps { }

const BrandLogo: FC<BrandLogoProps> = ({  }) => {
  const navigate = useNavigate();
  const helperFunction = () =>{
    navigate(HOME_PAGE)
  }
  return (
      <img
        src="/images/BrandLogo.png"
        alt="Cypheryard Logo"
        width={200}
        height={50}
        className="cursor-pointer"
        onClick={helperFunction}
      />
  );
};

export default BrandLogo;