import {FC, useState} from 'react';
import FormElement from '../../components/atoms/FormElement';
import { RESET_PASSWORD_REQUEST } from '../../services/auth';
import { useAuthStore } from '../../helpers/authStore';

export interface ResetPasswordPageProps{}

const ResetPasswordPage: FC<ResetPasswordPageProps> =()=>{
    const user = useAuthStore((state) => state.user);
    const authToken = useAuthStore((state) => state.authToken);
    console.log(authToken)
    const [postData, setPostData] = useState({
        email: user!.email,
        password:'',
        confirmPassword: ''
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
        setErrorMsg('');
        const result = await RESET_PASSWORD_REQUEST(rest, authToken!, user!.role)
        if(result === 'OK'){
            console.log('success')
            toggleSuccess(true);
        }
        else{
            setErrorMsg('Something went wrong, please try again later.');
        }
    }
    return (
    <div className='flex items-start justify-center '>
        <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] desktop:w-[40%] py-10 '>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Reset Password
            </h1>
            <form className="py-8 mx-auto">

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
                <h1 className='relative items-center justify-center   text-green'>{"*Check your email and verify your account."}</h1>
            </div>:<></>
            }

            </div>
        </div>
    </div>)
}

export default ResetPasswordPage;