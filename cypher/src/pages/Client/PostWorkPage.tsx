import {FC,useState} from 'react';
import RemovableSkillBox from '../../components/atoms/RemovableSkillBox';
interface PostWorkPageProps {}
interface StateDeclaration {
    values:string[]
}
const PostWorkPage: FC<PostWorkPageProps> =() =>{
    const [techs,EditTechs] =  useState<StateDeclaration>({values:[]})
    const [currSkill,SetCurrSkill] = useState('')
    const [orderData,setOrderData] = useState({
        title: "",
        description:"",
        budget:"",
        tech:[],
        milestones:""
    })
    const handleChange = (e:any) =>{
        setOrderData({...orderData,[e.target.name]:e.target.value})
    }
    const handleAddingSkill = (e:any) =>{
        SetCurrSkill(e.target.value)
    }
    const handleAddSkill = (e:any) =>{
        if(currSkill.length ==0){
            return
        }
        let newValue = techs.values
        newValue.push(currSkill)
        
        EditTechs({values:newValue})
        SetCurrSkill('')
    }
    const handleDeleteSkill = (i:number) =>{
        let newTechs = []
        let arrayIndex =0;
        while(arrayIndex<techs.values.length){
            if(arrayIndex!=i){
                newTechs.push(techs.values[arrayIndex])
            }
            arrayIndex+=1
        }
        EditTechs({values:newTechs})
    }
    const skillList = techs.values.map((tech,index) =>  <RemovableSkillBox skill={tech} index={index} parentFunc={handleDeleteSkill} key={index}/>);

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
                    <input className='border-b-2 border-primary mb-5 outline-none text-xl w-full text-secondary'  name="title" placeholder='Job Title' onChange={handleChange}/>
                    <textarea className="mb-10 outline-none w-full" name="description" placeholder='Project Description' onChange={handleChange}/>
                </div>
                <div className='border-b-2 border-lightgrey mb-5 pb-5'>
                    <h1 className='text-secondary text-lg'>Skills</h1>
                    <div className='flex flex-wrap mt-5'>
                        <input className='border-b-2 border-primary mb-5 mr-5 outline-none text-xl w-[20%] text-secondary'  name="title" placeholder='Add Skill' value={currSkill} onChange={handleAddingSkill}/>
                        <h2 className='flex items-center justify-center text-primary underline cursor-pointer' onClick={handleAddSkill}>Add Skill</h2>
                    </div>

                    <div className='flex flex-wrap'>
                        {skillList}
                    </div>
                    
                </div>
                <div>
                <h1 className='text-secondary text-lg mb-2'>Attachment</h1>
                <input className="mb-10" type='file'/>
                <h1 className='text-secondary text-lg mb-2'>Number of Milestones</h1>
                <input className='border-b-2 border-primary mb-10 outline-none text-xl w-10 text-secondary' onChange={handleChange} name={"milestones"} placeholder='#'/>

                <h1 className='text-secondary text-lg mb-2'>Budget($)</h1>
                <input className='border-b-2 border-primary mb-10 outline-none text-lg w-10 text-secondary'  placeholder='$' onChange={handleChange} name={"budget"} />
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