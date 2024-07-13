import { FC, useState } from 'react';
import BidPopUp from '../molecules/BidPopUp';
import { useAuthStore } from '../../helpers/authStore';
import { ATTACHMENTS_REQUEST, CYPHER_FILE_UPLOAD_REQUEST } from '../../services/cypher';

export interface CypherProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        status: string;
        filesCount: number;
        completedMilestones: number;
    };
    bidPlaced: boolean;
}

const CypherProjectDetails: FC<CypherProjectDetailsProps> = ({ project, bidPlaced }) => {
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const [fileUploadMsg, setFileUploadMsg] = useState<number | null>(null);

    const [toggleOpen, setToggleOpen] = useState(false);
    const [apiError, setApiError] = useState<boolean>(false);

    const handleBid = () => {
        setToggleOpen(true);
    };

    const handleClosePopup = () => {
        setToggleOpen(false);
    };

    const handleBidSuccess = () => {
        window.location.reload();
    };

    const techArray = JSON.parse(project.tech);

    const [attachments, setAttachments] = useState<string[]>([]);
    const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);

    const handleAttachments = async () => {
        setIsLoadingAttachments(true);
        try {
            const response = await ATTACHMENTS_REQUEST(project.id, authToken!, user!.role);
            const attachmentUrls = response.data.urls;
            setAttachments(attachmentUrls);
        } catch (error) {
            setApiError(true)
        } finally {
            setIsLoadingAttachments(false);
        }
    };

    const completionPercentage = (project.completedMilestones / project.milestones) * 100;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);

        try {
            const result = await CYPHER_FILE_UPLOAD_REQUEST(filesArray, authToken!, user!.role, project.id);
            if (result === "Something went wrong, please try again later.") {
                setFileUploadMsg(2);
            } else {
                setFileUploadMsg(1);
            }
        } catch (error) {
            setFileUploadMsg(2);
        }
    };

    return (
        <>
            {apiError ? (
                <p>Something went wrong</p>
            ) : (
                <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya overflow-hidden h-full">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                        {project.status === 'open' && (
                            <div>
                                {bidPlaced ? (
                                    <div className="flex justify-between items-center px-5 py-2 bg-buttonGrey rounded-sm text-white">
                                        <p>pending</p>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center pb-4">
                                        <button className="bg-primary text-white px-5 py-2 rounded-sm" onClick={handleBid}>Bid On Project</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {project.status === 'active' && (
                            <div className="flex justify-between items-center px-5 bg-primary rounded-sm text-white">
                                <p>Active</p>
                            </div>
                        )}
                        {project.status === 'completed' && (
                            <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                                <p>Completed</p>
                            </div>
                        )}
                    </div>
                    <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
                    <p className="text-sm pb-4 text-secondary h-40 overflow-y-auto">{project.description}</p>
                    <p className="text-md pb-4 text-secondary">Skills</p>
                    <div className="flex gap-4 flex-wrap pb-4">
                        {techArray.map((skill: string) => (
                            <span key={skill} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <hr className="my-10 border-t-2 border-black border-opacity-5" />
                    <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">
                        <div>
                            <h3 className="text-md text-secondary pb-4">Attachments</h3>
                            <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm cursor-pointer" onClick={handleAttachments}>
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
                        <div>
                            <div>
                                <h1 className='text-md text-secondary pb-4 font-abhaya'>Upload Files</h1>
                                <input className="mb-10 block w-full text-xs text-secondary file:mr-2 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-abhaya file:bg-skillPurple file:text-secondary file:cursor-pointer" type='file' onChange={handleFileUpload} multiple/>
                            </div>
                            {fileUploadMsg === 1 && <p className="text-green">Files uploaded successfully</p>}
                            {fileUploadMsg === 2 && <p className="text-red">File upload failed</p>}
                        </div>
                    </div>
                    <BidPopUp isOpen={toggleOpen} onClose={handleClosePopup} project={project} onBidSuccess={handleBidSuccess} />
                </div>
            )}
        </>
    );
};

export default CypherProjectDetails;
