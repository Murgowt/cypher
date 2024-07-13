import {FC} from 'react'

interface SkillBoxProps {
    skill:string
};

const SkillBox:FC<SkillBoxProps> = ({skill}) =>{
    return(<div className='flex items-center justify-center bg-skillPurple text-secondary text-sm px-2 py-1 rounded-md'  >
    <h1>{skill}</h1>
    </div>)
    
}
export default SkillBox;