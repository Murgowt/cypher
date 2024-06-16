import {FC} from 'react'
import SkillBox from './SkillBox'

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
        <div key={index} className='flex items-center justify-center bg-skillPurple h-10 w-fit  text-secondary m-2 rounded-sm'>
            <SkillBox skill={skill} />
            <h1 className='text-red cursor-pointer px-3' onClick={handleClick}> X</h1>
        </div>
    )
}
export default RemovableSkillBox