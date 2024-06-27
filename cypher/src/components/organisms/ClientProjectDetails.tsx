import { FC } from 'react';
import CypherButton from '../atoms/CypherButton';

export interface ClientProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: string;
        status: string;
    };
}

const ClientProjectDetails: FC<ClientProjectDetailsProps> = ({ project }) => {

    const techArray = JSON.parse(project.tech)
    const renderButton = () => {
        if (project.status === 'completed') {
            return <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                <p>Completed</p>
            </div>;
        }

        if (project.status === 'active') {
            return <div className="flex justify-between items-center pb-4">
                <CypherButton 
                    placeHolder='Release Payment' 
                    helperFunction={() => console.log('Release Payment')} 
                />
            </div>;
        }

        if (project.status === 'open') {
                return <div className="flex justify-between items-center px-5 bg-buttonGrey rounded-sm text-white">
                    <p>Pending</p>
                </div>;
        }

        return null;
    };

    return (
       
                <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                        {renderButton()}
                    </div>
                    
                    <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
                    <p className="text-sm pb-4 text-secondary">{project.description}</p>
                    
                    <p className="text-md pb-4 text-secondary">Skills</p>
                    <div className="flex gap-4 flex-wrap pb-4">
                        {techArray.map((skill:any, index:any) => (
                            <span key={index} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <hr className="my-10 border-t-2 border-black border-opacity-5" />
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h3 className="text-md text-secondary pb-4">Attachment</h3>
                            <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                                {project.budget}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-md text-secondary pb-4">Budget</h3>
                            <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                                {project.budget}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-md text-secondary pb-4">Milestones</h3>
                            <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                                {project.milestones}
                            </span>
                        </div>
                    </div>
                </div>
    );
};

export default ClientProjectDetails;
