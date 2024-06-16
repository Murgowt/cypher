import { FC } from 'react';

interface ProjectDescriptionCardProps {
    project: {
        id: string;
        title: string;
        description: string;
        tech: string[];
    };
}

const ProjectDescriptionCard: FC<ProjectDescriptionCardProps> = ({ project }) => {
    return (
        <div className="p-8 rounded-md bg-white shadow-md font-abhaya">
            <h2 className="text-xl font-bold pb-2 text-secondary">{project.title}</h2>
            <hr className="pb-4 border-t-2 border-primary w-24 border-opacity-50" />
            <p className="text-xs pb-4 text-secondary">{project.description}</p>
            <p className="text-md pb-4 text-secondary">Skills</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    {project.tech.map((skill, index) => (
                        <span key={index} className="inline-block bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md">
                            {skill}
                        </span>
                    ))}
                </div>
                <a className="text-xs text-primary hover:underline">View More</a>
            </div>
        </div>
    );
};

export default ProjectDescriptionCard;
