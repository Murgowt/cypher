import {FC, useState} from 'react';
import FormElement from '../../components/atoms/FormElement';
import { CLIENT_SIGNUP_REQUEST } from '../../services/auth';
import { HOME_PAGE } from '../../constants/routes.ui';
import { useNavigate } from 'react-router-dom';

interface ClientSignUpPageProps{}

const ClientSignUpPage: FC<ClientSignUpPageProps> =()=>{
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile: '',
        password:'',
        confirmPassword: ''
    })
    const [errorMsg, setErrorMsg] = useState('');
    const [success,toggleSuccess] = useState(false);
    const handleChange = (e:any) =>{

        setPostData({...postData,[e.target.name]:e.target.value})
    }
    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        let {confirmPassword,...rest}=postData
        setErrorMsg('Loading....');
        const result = await CLIENT_SIGNUP_REQUEST(rest)
        if(result==2){
            console.log('success')
            setErrorMsg('');
            toggleSuccess(true);
            setPostData(postData)
            await sleep(1000)
            navigate(HOME_PAGE)
        }
        else if(result==1){
            setErrorMsg('Account with email already exists.');
        }
        else{
            setErrorMsg('Something went wrong, please try again later.');
        }
    }
    return (
    <div className='flex items-start justify-center mb-10'>
        <div className=' tablet:px-[5rem] bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] desktop:w-[40%] py-10'>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Welcome
            </h1>
            <div className="text-authSubHeading text-xs">
                <span>Sign up to get unlimited access to information and talent.</span>
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
                    labelText="Your Mobile Number" helperFunction={handleChange} 
                    placeHolder="" name="mobile" 
                    type="mobile" id="mobile" />

                <FormElement 
                    labelText="Your password*" helperFunction={handleChange} 
                    placeHolder="" name="password" 
                    type="password" id="password" />
                
                <FormElement 
                    labelText="Confirm password*" helperFunction={handleChange} 
                    placeHolder="" name="confirmPassword" 
                    type="password" id="confirmPassword" />
                
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
                <h1 className='relative items-center justify-center text-green'>{"*Account created successfully! Please check you email."}</h1>
            </div>:<></>
            }

            </div>
        </div>
    </div>)
}

export default ClientSignUpPage;