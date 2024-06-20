import {FC, useState} from 'react';
import FormElement from '../../components/atoms/FormElement';
import { useAuthStore } from '../../helpers/authStore';
import { CYPHER_SIGNIN_REQUEST } from '../../services/auth';
import { LoginResponse } from '../../interfaces/apis/auth';
import { CYPHER_DASHBOARD } from '../../constants/routes.ui';
import { useNavigate } from 'react-router-dom';

interface CypherSignInPageProps{}

const CypherSignInPage: FC<CypherSignInPageProps> =()=>{
    const setAuthToken = useAuthStore((state) => state.setAuthToken);
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const [errorMsg, setErrorMsg] = useState('');
    const [postData, setPostData] = useState({
        email:'',
        password:''
    })
    const [success,toggleSuccess] = useState(false);
    const handleChange = (e:any) =>{
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
        const result = await CYPHER_SIGNIN_REQUEST(postData)
        console.log(result)
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
            const loginResponse: LoginResponse = result;

            setAuthToken(loginResponse.token);
            setUser({
            name: {
                first: loginResponse.first_name,
                last: loginResponse.last_name,
            },
            email: loginResponse.email,
            username: loginResponse.username,
            role: 'wizard',
            });

            navigate(CYPHER_DASHBOARD)
        }
    }

    return (
        <div className='flex items-start justify-center '>
            <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] desktop:w-[40%] py-10 '>
                <div className='px-3'>
                <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
                   Welcome
                </h1>
                <div className="text-authSubHeading text-xs">
                    <span>Sign in to get unlimited access to opportunities and growth.</span>
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

export default CypherSignInPage;