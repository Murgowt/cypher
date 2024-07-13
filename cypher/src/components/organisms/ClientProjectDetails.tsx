import { FC, useState } from 'react';
import { ATTACHMENTS_REQUEST, UPDATEMILESTONE_REQUEST, CLOSEORDER_REQUEST } from '../../services/client';
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
        wizardId: string;
        filesCount: number
    };
}

const ClientProjectDetails: FC<ClientProjectDetailsProps> = ({ project }) => {
    const [message, setMessage] = useState<string | null>(null);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [completedMilestones, setCompletedMilestones] = useState(project.completedMilestones);
    const [projectStatus, setProjectStatus] = useState(project.status);
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);

    const handleClosePopup = () => {
        setToggleOpen(false);
    };

    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const techArray = JSON.parse(project.tech);

    const handleReleaseMilestone = async () => {
        try {
            const result = await UPDATEMILESTONE_REQUEST({ orderId: project.id }, authToken!, user!.role);
            if (result === 'OK') {
                setCompletedMilestones(prev => prev + 1);
                setMessage('Milestone released successfully.');
            } else {
                setMessage('Something went wrong');
            }
        } catch (error) {
            setMessage('Failed to release milestone.');
        }
    };

    const handleComplete = async () => {
        try {
            const result = await CLOSEORDER_REQUEST({ orderId: project.id }, authToken!, user!.role);
            if (result === 'OK') {
                setMessage('Order closed successfully.');
                setToggleOpen(true);
                setProjectStatus('completed');
            } else {
                setMessage('Something went wrong');
            }
        } catch (error) {
            setMessage('Failed to close order.');
        }
    };

    const renderButton = () => {
        if (projectStatus === 'completed') {
            return (
                <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                    <p>Completed</p>
                </div>
            );
        }

        if (projectStatus === 'active') {
            if (completedMilestones < project.milestones) {
                return (
                    <div className="flex justify-between items-center px-5 bg-primary rounded-sm text-white">
                        <button onClick={handleReleaseMilestone}>Release Milestone</button>
                    </div>
                );
            } else {
                return (
                    <div className="flex justify-between items-center px-5 bg-primary rounded-sm text-white">
                        <button onClick={handleComplete}>Close Project</button>
                    </div>
                );
            }
        }

        if (projectStatus === 'open') {
            return (
                <div className="flex justify-between items-center px-5 bg-buttonGrey rounded-sm text-white">
                    <p>pending</p>
                </div>
            );
        }

        return null;
    };

    const handleAttachments = async () => {
        setIsLoadingAttachments(true);
        try {
            const response = await ATTACHMENTS_REQUEST(project.id, authToken!, user!.role);
            const attachmentUrls = response.data.urls;
            setAttachments(attachmentUrls);
            console.log(attachmentUrls)
            if(attachmentUrls.length === 0){
                setIsLoadingAttachments(false)
            }
        } catch (error) {
            setMessage('Something went wrong')
            setIsLoadingAttachments(false);
        }
    };


    const completionPercentage = (completedMilestones / project.milestones) * 100;
    return (
        <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya h-full">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                {renderButton()}
            </div>

            {message && (
                <div className={`flex justify-end ${message.startsWith('Something') ? 'text-red' : 'text-green'}`}>
                    {message}
                </div>
            )}

            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-sm pb-4 text-secondary h-40 overflow-y-auto">{project.description}</p>

            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex gap-4 flex-wrap pb-4">
                {techArray.map((skill: any, index: any) => (
                    <span key={index} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
            <hr className="my-10 border-t-2 border-black border-opacity-5" />
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-md text-secondary pb-4">Attachments</h3>
                                <span 
                                    className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm cursor-pointer" 
                                    onClick={handleAttachments}
                                >
                                    {isLoadingAttachments ? 'Loading...' : project.filesCount === 0 ? '0' : 'Download'}
                                </span>
                                {attachments.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-md text-secondary pb-2">Attachment List:</h4>
                                        <ul>
                                            {attachments.map((url, index) => (
                                                <li key={index}>
                                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        Attachment {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                    </div>
                <div>
                    <h3 className="text-md text-secondary pb-4">Budget</h3>
                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                        {project.budget}
                    </span>
                </div>
                <div>
                            {project.status === 'open' ? (
                                <>
                                    <h3 className="text-md text-secondary pb-4">Milestones</h3>
                                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                                        {project.milestones}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-md text-secondary pb-4">Progress</h3>
                                    <div className="relative w-32 bg-purple rounded-sm px-12 py-2">
                                        <div className="absolute top-0 left-0 h-full bg-secondary rounded-sm" style={{ width: `${completionPercentage}%` }}
                                        ></div>
                                        <div className="relative text-sm text-center text-primary font-bold">
                                            {completionPercentage.toFixed(0)}%
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
            </div>
            <RatingPopUp isOpen={toggleOpen} onClose={handleClosePopup} project={project}/>
        </div>
    );
};

export default ClientProjectDetails;
