import {FC} from 'react';
import SkillBox from '../../components/atoms/SkillBox';

export interface PostWorkPageProps {}

const PostWorkPage: FC<PostWorkPageProps> =() =>{
    return(
        <div className='flex items-start justify-center '>
        <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden 
                         tablet:w-[80%] desktop:w-[60%] py-10 '>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Create Project
            </h1>
            <div className="text-authSubHeading text-xs">
                <span>Please enter your project information below. </span>
            </div>
            <form className="py-8 mx-auto">
                <div className='border-b-2 border-lightgrey mb-5'>
                    <input className='border-b-2 border-primary mb-5 outline-none text-xl w-full text-secondary'  name="title" placeholder='Job Title'/>
                    <textarea className="mb-10 outline-none w-full" name="description" placeholder='Project Description'/>
                </div>
                <div className='border-b-2 border-lightgrey mb-5 pb-5'>
                    <h1 className='text-secondary text-lg'>Skills</h1>
                    <div className='flex flex-wrap'>
                        <SkillBox skill={"Java programming"}/>
                        <SkillBox skill={"python"}/>
                        <SkillBox skill={"Java programming"}/>
                        <SkillBox skill={"python"}/>
                        <SkillBox skill={"Java programming"}/>
                        <SkillBox skill={"python"}/>
                    </div>

                </div>
                <div>
                <h1 className='text-secondary text-lg mb-2'>Attachment</h1>
                <input className="mb-10" type='file'/>
                <h1 className='text-secondary text-lg mb-2'>Number of Milestones</h1>
                <input className='border-b-2 border-primary mb-10 outline-none text-xl w-10 text-secondary'  placeholder='#'/>

                <h1 className='text-secondary text-lg mb-2'>Budget($)</h1>
                <input className='border-b-2 border-primary mb-10 outline-none text-lg w-10 text-secondary'  placeholder='$'/>
                </div>
                <div className='w-full'>
                    <button className="bg-secondary text-white px-5 py-3 w-full rounded-lg shadow-lg" >Create New Project</button>
                </div>
            </form>



            </div>
        </div>
    </div>
    )
}

export default PostWorkPage;