import { FC } from 'react';

import ProjectCard from '../molecules/ProjectCard';
import ProgressCounts from '../molecules/ProgressCounts';
export interface ClientProjectsProps {}

const ClientProjects: FC<ClientProjectsProps> = () => {

    let projects = [
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' },
        { name: 'Roseret', task: 'Wireframing', status: 'Pending', budget: '$40' }
      ];

  return (
    <div className='w-1/2 p-10'>
        <div className='flex justify-between font-abhaya pb-2'>
            <p className='text-md text-secondary'>Projects</p>
            <p className='text-md text-primary'>Manage Projects</p>
        </div>
        <div className='shadow-md p-4 bg-white rounded-md'>
            <ProgressCounts/>
            <div className="flex items-center py-4">
                <div className="flex flex-col gap-4">
                    <div className="py-4 px-4 grid grid-cols-1 gap-4 tablet:px-1">
                        { projects.map((i) => (
                            <div key={i.name} className="col-span-1">
                            <ProjectCard name={i.name} task={i.task} status={i.status} budget={i.budget}/>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ClientProjects;