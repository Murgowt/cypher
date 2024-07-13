import { FC, useState } from 'react';
import { useAuthStore } from '../../helpers/authStore';
import { CYPHER_RESET_PASSWORD_PAGE, RESET_PASSWORD_PAGE } from '../../constants/routes.ui';
import RequestPaymentPopUp from '../molecules/RequestPaymentPopUp';

export interface ProfileCardProps {}

const ProfileCard: FC<ProfileCardProps> = ({ }) => {
  const user = useAuthStore((state) => state.user);
  let details = { Username: user!.username, Email: user!.email, Password: '*******' };
  let ProfilePath = '/images/ProfilePhoto.png';
  let resetpage = user?.role === 'wizard' ? CYPHER_RESET_PASSWORD_PAGE : RESET_PASSWORD_PAGE
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  return (
    <>
      {user && (
        <div className="p-8 tablet:px-8">
          <div className="border-t border-black border-opacity-5 bg-white rounded-md relative pb-4 shadow-md h-[215px] monitor:h-[400px]">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                src={ProfilePath}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="p-4 pt-20 grid grid-cols-1 gap-1.5 tablet:px-1 monitor:gap-8">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex">
                  <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-md">{key}</p>
                  <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-md">{value}</p>
                </div>
              ))}
              <a href={resetpage}>
              <p className="truncate font-abhaya text-xxs text-primary text-right pr-10 monitor:text-sm">Change password</p>
              </a>
              {user.role === 'wizard' ? <p className="truncate font-abhaya text-xxs text-primary text-right pr-10 monitor:text-sm cursor-pointer" onClick={handlePopupOpen}>Request Payment</p> : <></>}
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && <RequestPaymentPopUp isOpen={isPopupOpen} onClose={handlePopupClose} />}
    </>
  );
};

export default ProfileCard;
