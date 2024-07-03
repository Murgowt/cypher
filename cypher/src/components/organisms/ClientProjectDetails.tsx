import { FC, useState } from 'react';
import CypherButton from '../atoms/CypherButton';
import { UPDATEMILESTONE_REQUEST, CLOSEORDER_REQUEST } from '../../services/client';
import { useAuthStore } from '../../helpers/authStore';
import RatingPopUp from '../molecules/RatingPopUp';

export interface ClientProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        status: string;
        completedMilestones: number;
    };
}

const ClientProjectDetails: FC<ClientProjectDetailsProps> = ({ project }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [toggleOpen, setToggleOpen] = useState(false);

    const handleClosePopup = () => {
        setToggleOpen(false);
    };

    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const techArray = JSON.parse(project.tech);

    const handleReleaseMilestone = async () => {
        try {
            const result = await UPDATEMILESTONE_REQUEST({ orderId: project.id }, authToken!, user!.role);
            if(result==='OK'){
                setMessage('Milestone released successfully.')
            }
            else{
                setMessage('Something went wrong')
            }
        } catch (error) {
            setMessage('Failed to release milestone.');
        }
    };

    const handleComplete = async () => {
        try {
            const result = await CLOSEORDER_REQUEST({ orderId: project.id }, authToken!, user!.role);
            console.log(result)
            if(result==='OK')
            {
                setMessage('Order closed successfully.')
                setToggleOpen(true)
            }
            else{
                setMessage('Something went wrong')
                
            }
        } catch (error) {
            setMessage('Failed to close order.');
        }
    };

    const renderButton = () => {
        if (project.status === 'completed') {
            return (
                <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                    <p>Completed</p>
                </div>
            );
        }

        if (project.status === 'active') {
            if (Number(project.milestones) !== Number(project.completedMilestones)) {
                console.log('not equal');
                return (
                    <div className="flex justify-between items-center pb-4">
                        <CypherButton placeHolder="Release Milestone" helperFunction={handleReleaseMilestone} />
                    </div>
                );
            } else {
                return (
                    <div className="flex justify-between items-center pb-4">
                        <CypherButton placeHolder="Close Project" helperFunction={handleComplete} />
                    </div>
                );
            }
        }

        if (project.status === 'open') {
            return (
                <div className="flex justify-between items-center px-5 bg-buttonGrey rounded-sm text-white">
                    <p>Pending</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                {renderButton()}
            </div>

            {message && (
                <div className={`mt-4 flex items-end ${message.startsWith('Something') ? 'text-red' : 'text-green'}`}>
                    {message}
                </div>
            )}

            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-sm pb-4 text-secondary">{project.description}</p>

            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex gap-4 flex-wrap pb-4">
                {techArray.map((skill: any, index: any) => (
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
            <RatingPopUp isOpen={toggleOpen} onClose={handleClosePopup} />
        </div>
    );
};

export default ClientProjectDetails;
