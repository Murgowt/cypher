import { FC, ReactNode } from 'react';

export interface AboutUsCardProps {
  icon: ReactNode;
  title: string;
  info: string;
}

const AboutUsCard: FC<AboutUsCardProps> = ({ icon,title,info }) => {
  return (
    <div className="flex flex-col items-center gap-5 p-10 rounded-lg h-full monitor:p-10">
      <div className='bg-purple w-20 h-20 desktop:w-32 desktop:h-32 rounded-full flex items-center justify-center'>
      <span className="text-secondary font-bold text-2xl tablet:text-2xl desktop:text-3xl">
        {icon}
      </span>
      </div>
      <p className="font-bold text-secondary text-center tablet:text-xl monitor:text-xl"> {title} </p>
      <p className="font-abhaya text-center text-sm text-grey monitor:text-md"> {info} </p>
    </div>
  );
};
export default AboutUsCard;