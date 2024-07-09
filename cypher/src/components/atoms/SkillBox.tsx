import {FC} from 'react'

interface SkillBoxProps {
    skill:string
};

const SkillBox:FC<SkillBoxProps> = ({skill}) =>{
    return(<div className='flex items-center justify-center bg-skillPurple h-10 w-fit px-2 py-1 text-secondary m-2 rounded-md'  >
    <h1>{skill}</h1>
    </div>)
}
export default SkillBox;