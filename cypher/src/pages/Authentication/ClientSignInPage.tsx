import {FC,useState} from 'react';
import FormElement from '../../components/atoms/FormElement';
import { CLIENT_SIGNIN_REQUEST } from '../../services/auth';
interface ClientSignInPageProps{}

const ClientSignInPage: FC<ClientSignInPageProps> =()=>{
    const [postData, setPostData] = useState({
        email:'',
        password:''
    })
    const [errorMsg, setErrorMsg] = useState('');
    const [success,toggleSuccess] = useState(false);
    const handleChange = (e:any) =>{
        console.log(e.target.value)
        setPostData({...postData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e:any) =>{
        toggleSuccess(false)
        e.preventDefault();
        if(postData.email.length==0){
            setErrorMsg('Email cant be empty.');
            return
        }
        if(postData.password.length==0){
            setErrorMsg('Password cant be empty.');
            return
        }
        if(postData.password.length<8){
            setErrorMsg('The password entered is incorrect.');
            return
        }
       
        setErrorMsg('');
        const result = await CLIENT_SIGNIN_REQUEST(postData)
        if(result == "Something went wrong, please try again later."){
            setErrorMsg("Something went wrong, please try again later.");
            return
        }
        if(result == "User doesn't exist"){
            setErrorMsg(result);
            return
        }
        if(result == "Password doesn't match"){
            setErrorMsg(result);
            return
        }
        else{
            toggleSuccess(true);
            
        }
    }
    return (
    <div className='flex items-start justify-center '>
        <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] monitor:w-[40%] py-10 '>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Welcome
            </h1>
            <div className="text-authSubHeading text-xs">
                <span>Sign up to get unlimited access to information and talent.</span>
            </div>
            
            <form className="py-8 mx-auto">

    

                <FormElement 
                    labelText="Your Email*" helperFunction={handleChange} 
                    placeHolder="" name="email" 
                    type="email" id="email" />

                <FormElement 
                    labelText="Your password*" helperFunction={handleChange} 
                    placeHolder="" name="password" 
                    type="password" id="password" />
                
            <div className='w-full'>
                <button className="bg-primary text-white px-5 py-3 w-full rounded-lg shadow-lg" onClick={handleSubmit}>Submit</button>
            </div>
            </form>
            {
                errorMsg.length==0?<></>:<div >
                <h1 className='relative items-center justify-center   text-red'>*{errorMsg}</h1>
            </div>
            }
            {
                success?<div >
                <h1 className='relative items-center justify-center   text-green'>{"*Login Succesful, loading..."}</h1>
            </div>:<></>
            }

            </div>
        </div>
    </div>)
}


export default ClientSignInPage;