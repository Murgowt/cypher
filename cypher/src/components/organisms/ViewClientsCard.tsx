import { FC } from 'react';
import { AllOrdersResponse } from '../../interfaces/apis/clientapis';
import { CLIENT_PROJECTS } from '../../constants/routes.ui';

export interface ViewClientsCardProps {
  activeOrders: AllOrdersResponse['activeOrders'];
}

const ViewClientsCard: FC<ViewClientsCardProps> = ({ activeOrders = [] }) => {
  const imgPath = '/images/ProfilePhoto.png';
  const chatImgPath = '/images/Chat.png';
  const activeOrderss = [
    {
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: '1717956501214-Syble Mosciski',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    },
    {
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    }, {
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    }, {
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    }, {
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    },{
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    },{
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    },{
      budget: 10,
      milestones: 4,
      status: 'open',
      wizardRating: 0,
      clientId: 'Syble Mosciskiiiiiii',
      tech: ['Java', 'NLP', 'Python'],
      completedMilestones: 0,
      clientRating: 0,
      creationtimestamp: 1718492829012,
      description: 'def',
      id: '1718492829012-abc',
      wizardId: 'NA',
      title: 'abc',
    },
  ];

  return (
    <div className="p-2 tablet:pl-8 pb-4">
      <div className="flex justify-between font-abhaya px-4">
        <p className="text-md text-secondary monitor:text-lg">
          Clients ({activeOrders?.length})
        </p>
        <a href={CLIENT_PROJECTS}>
          <p className="text-sm text-orange monitor:text-md">View All</p>
        </a>
      </div>
      <div className="shadow-md p-4 bg-white rounded-md overflow-y-auto monitor:py-8" style={{ maxHeight: '250px' }}>
          {activeOrderss.length === 0 ? (
            <p className="text-center text-xs text-black font-abhaya my-10">
              No clients yet
            </p>
          ) : (
            <div className="flex flex-col px-4">
              {activeOrderss.map((i) => (
                <div className="flex justify-between items-center my-4">
                  <div key={i.id} className="flex items-center">
                    <img src={imgPath} alt="Profile Image" className="w-12 h-12 rounded-md"/>
                    <div className="ml-4">
                      <p className="font-abhaya text-xs">{i.clientId}</p>
                      <p className="font-abhaya text-sm">{i.title}</p>
                    </div>
                  </div>
                  <img src={chatImgPath} alt="Chat Icon" className="w-8 h-8 rounded-md ml-auto"/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default ViewClientsCard;