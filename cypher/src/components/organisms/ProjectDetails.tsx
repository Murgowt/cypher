import { FC } from 'react';

interface ProjectDetailsProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string[];
        budget: string;
        milestones: string;
    };
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project }) => {
    return (
        <div className="p-8 rounded-md bg-white shadow-md font-abhaya">
            <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-xs pb-4 text-secondary">{project.description}</p>
            <div className="flex justify-between items-center pb-4">
                <span className="bg-approved text-xs text-white px-2 py-1 rounded-md">Approved</span>
            </div>
            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex gap-4 flex-wrap pb-4">
                {project.tech.map((skill, index) => (
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

export default ProjectDetails;
