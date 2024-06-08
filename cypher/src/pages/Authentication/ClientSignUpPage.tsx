import {FC, useState} from 'react';
import FormElement from '../../components/atoms/FormElement';
import { CLIENT_SIGNUP_REQUEST } from '../../services/auth';
interface ClientSignUpPageProps{}

const ClientSignUpPage: FC<ClientSignUpPageProps> =()=>{
    const [postData, setPostData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirmPassword: ''
    })

    const handleChange = (e:any) =>{
        console.log(e.target.value)
        setPostData({...postData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        let {confirmPassword,...rest}=postData
        CLIENT_SIGNUP_REQUEST(rest)
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
                
            <div className='w-full'>
                <button className="bg-primary text-white px-5 py-3 w-full rounded-lg shadow-lg" onClick={handleSubmit}>Submit</button>
            </div>
            </form>


            </div>
        </div>
    </div>)
}

export default ClientSignUpPage;