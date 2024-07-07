import { FC, useState } from 'react';
import CypherButton from '../atoms/CypherButton';
import BidPopUp from '../molecules/BidPopUp';
import { useAuthStore } from '../../helpers/authStore';
import { ATTACHMENTS_REQUEST } from '../../services/cypher';
import { isAxiosError } from 'axios';
import { ERRORS } from '../../constants/app';
import { CYPHER_FILE_UPLOAD_REQUEST } from '../../services/cypher';

export interface CypherProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string;
        budget: number;
        milestones: number;
        status: string;
        filesCount: number
    };
    bidPlaced: boolean
}

const CypherProjectDetails: FC<CypherProjectDetailsProps> = ({ project, bidPlaced }) => {
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const [fileUploadMsg,setMsg] = useState(0);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    
    const handleBid = () => {
        setToggleOpen(true);
    };

    const handleClosePopup = () => {
        setToggleOpen(false);
    };
    const techArray = JSON.parse(project.tech)

    const [attachments, setAttachments] = useState<string[]>([]);
    const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);

    const handleAttachments = async () => {
        setIsLoadingAttachments(true);
        const attachmentPromises = [];

        for (let i = 1; i <= project.filesCount; i++) {
            const key = `${project.id}${i}`;
            attachmentPromises.push(ATTACHMENTS_REQUEST(key, authToken!, user!.role));
        }

        try {
            const responses = await Promise.all(attachmentPromises);
            const attachmentUrls = responses.map(response => response.data.url);
            console.log(attachmentUrls)
            setAttachments(attachmentUrls);
        } catch (error) {
            if (isAxiosError(error)) {
                setApiError(error.response?.data?.error || error.response?.data?.message || ERRORS.SERVER_ERROR);
            } else {
                setApiError(ERRORS.SERVER_ERROR);
            }
        } finally {
            setIsLoadingAttachments(false);
        }
    };

    const handleFileUpload = async (e:any) =>{
        let file:File[] = []
        const filesVar = e.target.files
        let uploaded = file
        for (var i = 0; i < filesVar.length; i++) {
            uploaded.push(filesVar[i]);
        }

        let result = await CYPHER_FILE_UPLOAD_REQUEST(filesVar,authToken!,user!.role,project.id)
        if(result == "Something went wrong, please try again later."){
            setMsg(2)
        }
        else{
            setMsg(1)
        }
    }

    return (<>
        {apiError ? (
            <p>Something went wrong</p>
          ) : (
            <>
              <div className="p-4 tablet:p-8 rounded-md bg-white shadow-md font-abhaya overflow-hidden">
            <div className='flex justify-between'>
                <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
                {project.status === 'open' && (
                    <div>
                        {bidPlaced ? (
                            <div className="flex justify-between items-center px-5 py-2 bg-buttonGrey rounded-sm text-white">
                                <p>Pending</p>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center pb-4">
                                <CypherButton 
                                    placeHolder="Bid On Project"
                                    helperFunction={handleBid}  
                                />
                            </div>
                        )}
                    </div>
                )}
                {project.status === 'active' &&  <div className="flex justify-between items-center px-5 bg-primary rounded-sm text-white">
                    <p>Active</p>
                </div>} 
                {project.status === 'completed' &&  <div className="flex justify-between items-center px-5 bg-green rounded-sm text-white">
                    <p>Completed</p>
                </div>} 
            </div>
            
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-sm pb-4 text-secondary">{project.description}</p>
            
            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex gap-4 flex-wrap pb-4">
                {techArray.map((skill: string) => (
                    <span key={skill} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                        {skill}
                    </span>
                ))}
            </div>
            <hr className="my-10 border-t-2 border-black border-opacity-5" />
            <div className="grid grid-cols-1  tablet:grid-cols-4  gap-4">
                <div>
                    <h3 className="text-md text-secondary pb-4">Attachments</h3>
                    <span 
                className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm cursor-pointer" 
                onClick={handleAttachments}
                >
                {isLoadingAttachments ? 'Loading...' : project.filesCount}
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
                    <h3 className="text-md text-secondary pb-4">Milestones</h3>
                    <span className="inline-block bg-skillPurple text-secondary text-sm px-12 py-2 rounded-sm">
                        {project.milestones}
                    </span>
                </div>
                <div>
                    <h3 className="text-md text-secondary pb-4">Upload Files</h3>
                    <input className="mb-10" type='file' onChange={handleFileUpload} multiple/>
                    
                </div>
            </div>
            {fileUploadMsg==1 && <h1 className='text-green'>File Uploaded Successfully!</h1>}
            {fileUploadMsg==2 && <h1 className='text-red'>Couldn't upload file</h1>}
            <BidPopUp isOpen={toggleOpen} onClose={handleClosePopup} project={project} />
        </div>
            </>
          )}
    </>
        
    );
};

export default CypherProjectDetails;
