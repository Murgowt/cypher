import { FC } from 'react';

import { aboutUsDetails } from '../../constants/properties';
import AboutUsCard from '../molecules/AboutUsCard';
export interface AboutUsSectionProps {}

const AboutUsSection: FC<AboutUsSectionProps> = () => {
  return (
    <div className="flex items-center py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-abhaya text-center text-2xl text-secondary font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl">
          The premier platform connecting with verified freelance coders
        </h1>
        <p className="font-abhaya text-center text-md text-secondary tablet:text-left tablet:text-sm desktop:text-md">
          Lorem ipsum dolor sit amet consectetur. Nisl amet et lacus pellentesque magna dignissim malesuada ut. Euismod non vitae ut sed enim ut. Commodo auctor volutpat est posuere leo habitasse tellus scelerisque adipiscing. Vitae pharetra sit in erat. Dictumst senectus risus tincidunt mauris.
        </p>
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