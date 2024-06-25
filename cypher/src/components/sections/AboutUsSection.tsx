import { FC } from 'react';

import { aboutUsDetails } from '../../constants/properties';
import AboutUsCard from '../molecules/AboutUsCard';
export interface AboutUsSectionProps {}

const AboutUsSection: FC<AboutUsSectionProps> = () => {
  return (
    <div className="flex items-center py-8">
      <div className="flex flex-col gap-4">
        <div className="py-4 px-4 grid grid-cols-1 gap-10 tablet:px-1 tablet:grid-cols-3 tablet:gap-10 desktop:gap-32 monitor:gap-40">
          { aboutUsDetails.map((card) => (
            <div key={card.title} className="col-span-1">
              <AboutUsCard icon={<card.img />} title={card.title} info={card.info}/>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;