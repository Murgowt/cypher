import { FC } from 'react';
import { CLIENT_DASHBOARD, CYPHER_DASHBOARD, HOME_PAGE } from '../../constants/routes.ui';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../helpers/authStore';

export interface BrandLogoProps { }

const BrandLogo: FC<BrandLogoProps> = ({  }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const helperFunction = () =>{
    if(isAuthenticated){
      if(user?.role==='wizard'){
        navigate(CYPHER_DASHBOARD)
      }
      else{
        navigate(CLIENT_DASHBOARD)
      }
    }
    else{
      navigate(HOME_PAGE)
    }
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