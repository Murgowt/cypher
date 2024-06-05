import { FC, ReactNode } from 'react';

export interface AboutUsCardProps {
  icon: ReactNode;
  title: string;
  info: string;
}

const AboutUsCard: FC<AboutUsCardProps> = ({ icon,title,info }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-5 border border-lightgrey rounded-lg h-full monitor:p-10">
      <span className="text-primary text-xl tablet:text-lg desktop:text-xl">
        {icon}
      </span>
      <p className="font-bold text-secondary tablet:text-md monitor:text-lg"> {title} </p>
      <p className="font-abhaya text-sm text-grey monitor:text-md"> {info} </p>
    </div>
  );
};
export default AboutUsCard;