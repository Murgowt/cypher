import {FC,useState} from 'react';
import RemovableSkillBox from '../../components/atoms/RemovableSkillBox';
import CREATE_PROJECT_REQUEST from '../../services/CreateProject';
import { useAuthStore } from '../../helpers/authStore';
import { useNavigate } from 'react-router-dom';
import { CLIENT_DASHBOARD } from '../../constants/routes.ui';
import { IoIosAddCircle } from "react-icons/io";

interface PostWorkPageProps {}
interface StateDeclaration {
    values:string[]
}
interface OrderSataDeclaration {
    title: string,
    description:string,
    budget:number,
    tech:string[],
    milestones:number,
    file : File[]
}
const PostWorkPage: FC<PostWorkPageProps> =() =>{
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    const [file,setFile ] = useState<File[]>([]);
    const [techs,EditTechs] =  useState<StateDeclaration>({values:[]})
    const [errorMsg,setErrorMsg] = useState('');
    const [success,toggleSuccess] = useState(false);
    const [currSkill,SetCurrSkill] = useState('')
    const [orderData,setOrderData] = useState<OrderSataDeclaration>({
        title: "",
        description:"",
        budget:0,
        tech:[],
        milestones:0,
        file:[]
    })

    const handleFileUpload = (e:any) =>{
        const filesVar = e.target.files
        let uploaded = file
        console.log(filesVar)
        for (var i = 0; i < filesVar.length; i++) {
            uploaded.push(filesVar[i]);
        }
        console.log("uploaded",uploaded)
        setFile(uploaded)
    }

    const handleChange = (e:any) =>{
        setOrderData({...orderData,[e.target.name]:e.target.value})
    }
    const handleAddingSkill = (e:any) =>{
        SetCurrSkill(e.target.value)
    }
    const handleAddSkill = () =>{
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
    const handleSubmit= async (e:any) =>{
        e.preventDefault();
        if(orderData.title.length==0){
            setErrorMsg('Title cant be empty.');
            return
        }
        if(orderData.description.length==0){
            setErrorMsg('Project Description cant be empty.');
            return
        }
        if(techs.values.length==0){
            setErrorMsg('Please add a few skills.');
            return
        }
        else{
            orderData.tech=techs.values
        }
        if(orderData.description.length==0){
            setErrorMsg('Project Description cant be empty.');
            return
        }
        if(Number(orderData.milestones)==0 ){
            setErrorMsg('Please set a valid number of milestones.');
            return
        }
        if(Number(orderData.budget)<10){
            setErrorMsg('Minimum budget is 10$.');
            return
        }
        setErrorMsg('');
        const data = orderData;

        data.file = file

        const result = await CREATE_PROJECT_REQUEST(data,authToken!,user!.role)
        if(result == "Something went wrong, please try again later."){
            setErrorMsg("Something went wrong, please try again later.");
            return
        }
        else{
            toggleSuccess(true);
            navigate(CLIENT_DASHBOARD);
        }
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
                <div className='border-b-2 border-lightgrey mb-10'>
                    <input className='mb-2 outline-none text-lg w-full text-secondary font-abhaya placeholder-secondary placeholder-opacity-50'  name="title" placeholder='Job Title' onChange={handleChange}/>
                    <hr className="pb-4 border-t-2 border-primary w-24" />
                    <textarea className="mb-10 outline-none w-full text-md font-abhaya placeholder-secondary placeholder-opacity-50" name="description" placeholder='Project Description' onChange={handleChange}/>
                </div>
                <div className='border-b-2 border-lightgrey mb-10 pb-5'>
                    <h1 className='text-secondary text-lg font-abhaya'>Skills</h1>
                    <div className='flex flex-wrap mt-5'>
                        <input className='mb-10 text-sm rounded-sm placeholder-secondary bg-skillPurple px-4 py-2 desktop:w-[20%] font-abhaya' onKeyDown={(e) => {if (e.key === 'Enter') {handleAddSkill();}}} name="title" placeholder='Enter Skills' value={currSkill} onChange={handleAddingSkill}/>
                        <IoIosAddCircle className="mx-4 mt-2 text-xl text-secondary" onClick={handleAddSkill}/>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {skillList}
                    </div>
                </div>
                <div className='grid desktop:grid-cols-3 gap-4'>
                    <div>
                        <h1 className='text-md text-secondary pb-4 font-abhaya'>Attachment</h1>
                        <input className="mb-10 block w-full text-xs text-secondary file:mr-2 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-abhaya file:bg-skillPurple file:text-secondary file:cursor-pointer" type='file' onChange={handleFileUpload} multiple/>
                    </div>
                    <div>
                        <h1 className='text-md text-secondary pb-4 font-abhaya'>Number of Milestones</h1>
                        <input className='mb-10 text-sm rounded-sm text-secondary bg-skillPurple px-4 py-2 w-[60%]' onChange={handleChange} name={"milestones"} placeholder='#' min="1" type='number'/>
                    </div>
                    <div>
                        <h1 className='text-md text-secondary pb-4 font-abhaya'>Budget($)</h1>
                        <input className='mb-10 text-sm rounded-sm text-secondary bg-skillPurple px-4 py-2  w-[60%]'  placeholder='$' onChange={handleChange} name={"budget"} type='number'/>
                    </div>
                </div>
                <div className='w-full'>
                    <button className="bg-secondary text-white px-5 py-3 w-full rounded-lg shadow-lg" onClick={handleSubmit} >Create New Project</button>
                </div>
            </form>
            {
                errorMsg.length==0?<></>:<div >
                <h1 className='relative items-center justify-center text-red'>*{errorMsg}</h1>
            </div>
            }
            {
                success?<div >
                <h1 className='relative items-center justify-center text-green'>{"*Login Succesful, loading..."}</h1>
            </div>:<></>
            }
            </div>
        </div>
    </div>
    )
}

export default PostWorkPage;