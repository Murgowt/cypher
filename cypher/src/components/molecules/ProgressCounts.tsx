import { FC } from 'react';
import { progressDetails } from '../../constants/properties';
import ProgressCard from '../atoms/ProgressCard';

export interface ProgressCountsProps {}

const ProgressCounts: FC<ProgressCountsProps> = () => {
  let temp = [13, 21, 30];

  return (
    <div className="flex py-2">
      <div className="flex flex-col gap-4 w-full">
        <div className="py-2 grid grid-cols-3 gap-4 tablet:px-4 tablet:grid-cols-3 tablet:gap-10 desktop:gap-4">
          {progressDetails.map((i, index) => (
            <div key={i.title} className="col-span-1">
              <ProgressCard title={i.title} color={i.color} count={temp[index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCounts;