import { FC } from 'react';

export interface ProgressCardProps {
  title: string;
  count: number;
  color: string
}

const ProgressCard: FC<ProgressCardProps> = ({ title, color, count }) => {
  return (
    <div className="flex flex-col gap-8 pt-4 pb-4 px-4 pr-24 rounded-xl h-full monitor:p-10" style={{ backgroundColor: color }}>
      <p className="text-white text-xs monitor:text-xl"> {title} </p>
      <p className="text-white font-extrabold text-xl monitor:text-3xl"> {count} </p>
    </div>
  );
};
export default ProgressCard;