import { FC } from 'react';
import { useAuthStore } from '../../helpers/authStore';
import { RESET_PASSWORD_PAGE } from '../../constants/routes.ui';

export interface ProfileCardProps {}

const ProfileCard: FC<ProfileCardProps> = ({ }) => {
  const user = useAuthStore((state) => state.user);
  let details = { Username: user!.username, Email: user!.email, Password: '*******' };
  let ProfilePath = '/images/ProfilePhoto.png';

  return (
    <>
      {user && (
        <div className="p-8 tablet:px-8 pb-4 h-1/2">
          <div className="border border-black border-opacity-5 bg-white rounded-md relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                src={ProfilePath}
                alt="Profile Picture"
                className="w-28 h-28 rounded-full object-cover"
              />
            </div>
            <div className="p-4 pt-24 grid grid-cols-1 gap-2 tablet:px-1 monitor:gap-8">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex">
                  <p className="w-1/2 truncate font-abhaya text-xs text-black pl-10 monitor:text-md">{key}</p>
                  <p className="w-1/2 truncate font-abhaya text-xs text-black text-right pr-10 monitor:text-md">{value}</p>
                </div>
              ))}
              <a href={RESET_PASSWORD_PAGE}>
              <p className="truncate font-abhaya text-xxs text-primary text-right pr-10 monitor:text-sm">Change password</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
