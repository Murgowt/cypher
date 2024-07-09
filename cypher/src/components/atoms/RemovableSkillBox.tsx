import {FC} from 'react'
import SkillBox from './SkillBox'
import { IoIosClose } from "react-icons/io";

interface RemovableSkillBoxProps {
    skill:string,
    index:number,
    parentFunc : (i:number)=>void
}

const RemovableSkillBox:FC<RemovableSkillBoxProps> = ({skill,index,parentFunc}) =>{
    const handleClick = () =>[
        parentFunc(index)
    ]
    return (
        <div key={index} className='flex items-center justify-center bg-skillPurple h-10 w-fit text-secondary rounded-sm'>
            <SkillBox skill={skill} />
            <IoIosClose className='text-red text-xl' onClick={handleClick}/>
        </div>
    )
}
export default RemovableSkillBox