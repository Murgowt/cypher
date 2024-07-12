import { FC } from 'react';

export interface ActiveProjectsCardProps {
  name: string;
  status: string;
}

const ActiveProjectsCard: FC<ActiveProjectsCardProps> = ({ name, status}) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg w-full text-xs monitor:text-lg monitor:p-6">
      <p className="w-1/2 truncate font-abhaya pl-10 text-black">{name}</p>
      <p className="w-1/2 truncate text-right pr-10 font-abhaya text-black">{status === 'open' ? 'pending' : status}</p>
  </div>
  );
};
export default ActiveProjectsCard;