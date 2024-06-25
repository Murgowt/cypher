import {FC,useState} from 'react';
 import FormElement from '../../components/atoms/FormElement';
import { useNavigate } from 'react-router-dom';
import { ENROLLMENT_TEST } from '../../constants/routes.ui';

interface CypherSignUpPageProps{}
interface PostDataDeclaration{
        first_name:string,
        last_name:string,
        email:string,
        password:string,
        confirmPassword: string,
        PAN?:File
}

const CypherSignUpPage: FC<CypherSignUpPageProps> =()=>{
    const navigate = useNavigate();
    const [postData, setPostData] = useState<PostDataDeclaration>({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const [errorMsg, setErrorMsg] = useState('');
    const [success,toggleSuccess] = useState(false);
    const handleChange = (e:any) =>{
        if(e.target.name=="PAN"){
            let data = postData
            data["PAN"]= e.target.files[0]
            setPostData(data)
            return
        }
        setPostData({...postData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e:any) =>{
        toggleSuccess(false)
        e.preventDefault();
        if(postData.first_name.length==0){
            setErrorMsg('First Name cant be empty.');
            return
        }
        if(postData.last_name.length==0){
            setErrorMsg('Last Name cant be empty.');
            return
        }
        if(postData.email.length==0){
            setErrorMsg('Email cant be empty.');
            return
        }
        if(postData.password.length==0){
            setErrorMsg('Password cant be empty.');
            return
        }
        if(postData.password.length<8){
            setErrorMsg('Password should be minimum 8 characters.');
            return
        }
        if(postData['confirmPassword']!= postData['password']){
            setErrorMsg('Passwords do not match');
            return
        }
 
        setErrorMsg('');
        navigate(ENROLLMENT_TEST,{state:postData})
        
    }
    return (
    <div className='flex items-start justify-center '>
        <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] desktop:w-[40%] py-10 '>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Welcome
            </h1>
            <div className="text-authSubHeading text-xs">
                <span>Sign up to get unlimited opportunities.</span>
            </div>
            
            <form className="py-8 mx-auto">

                <FormElement 
                    labelText="First Name*" helperFunction={handleChange} 
                    placeHolder="" name="first_name" 
                    type="first_name" id="first_name" />

                <FormElement 
                    labelText="Last Name*" helperFunction={handleChange} 
                    placeHolder="" name="last_name" 
                    type="last_name" id="last_name" />

                <FormElement 
                    labelText="Your Email*" helperFunction={handleChange} 
                    placeHolder="" name="email" 
                    type="email" id="email" />

                <FormElement 
                    labelText="Your password*" helperFunction={handleChange} 
                    placeHolder="" name="password" 
                    type="password" id="password" />
                
                <FormElement 
                    labelText="Confirm password*" helperFunction={handleChange} 
                    placeHolder="" name="confirmPassword" 
                    type="password" id="confirmPassword" />
                <div>
                    <label  className="block mb-2 text-sm font-medium text-secondary">{"Upload PAN Card*"}</label>
                    <input  className="mb-5" type="file" name="PAN"/>
                </div>
                
            <div className='w-full'>
                <button className="bg-primary text-white px-5 py-3 w-full rounded-lg shadow-lg" onClick={handleSubmit}>Take the Test</button>
            </div>
            </form>
            {
                errorMsg.length==0?<></>:<div >
                <h1 className='relative items-center justify-center   text-red'>*{errorMsg}</h1>
            </div>
            }
            {
                success?<div >
                <h1 className='relative items-center justify-center   text-green'>{"*Check your email and verify your account."}</h1>
            </div>:<></>
            }

            </div>
        </div>
    </div>)
}

export default CypherSignUpPage;