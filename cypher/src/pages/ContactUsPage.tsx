import { FC } from "react";
import Navbar from "../components/molecules/Navbar";
import LandingFooter from "../components/molecules/LandingFooter";
import { useState } from "react";
import FormElement from "../components/atoms/FormElement";
import EmailFunction from "../helpers/email";
import { HOME_PAGE } from "../constants/routes.ui";
import { useNavigate } from 'react-router-dom';

interface ContactUsFormProps{}
const ContactUsForm:FC<ContactUsFormProps> = () =>{
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [success,toggleSuccess] = useState(false);
    const [postData, setPostData] = useState({
        email:'',
        name:'',
        query:'',
        phoneno:''
    })
    const handleChange = (e:any) =>{
        setPostData({...postData,[e.target.name]:e.target.value})
    }
    function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const handleSubmit = async(e:any) =>{
        toggleSuccess(false)
        e.preventDefault();
        if(postData.email.length==0){
            setErrorMsg('Email cant be empty.');
            return
        }
        if(postData.name.length==0){
            setErrorMsg('Name cant be empty.');
            return
        }
        if(postData.phoneno.length==0){
            setErrorMsg('Phone number cannot be empty');
            return
        }
        if(postData.query.length==0){
            setErrorMsg('Query cannot be empty');
            return
        }
        console.log(e.target)
        let result = await EmailFunction(e.target)
        if(result){
            toggleSuccess(true);
            await sleep(1000)
            navigate(HOME_PAGE)
        }
        else{
            setErrorMsg('Something went wrong, please try again later.');
            return
        }
    }

    return(
        <>
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="mt-32">
            <div className='flex items-start justify-center '>
        <div className=' tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden tablet:w-[60%] desktop:w-[40%] py-10 '>
            <div className='px-3'>
            <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl p-0">
               Hey There!
            </h1>
            <div className="text-authSubHeading text-xs">
                <span>How can we help you?</span>
            </div>
            
            <form className="py-8 mx-auto" onSubmit={handleSubmit}>

    

                <FormElement 
                    labelText="Your Email*" helperFunction={handleChange} 
                    placeHolder="" name="email" 
                    type="email" id="email" />

                <FormElement 
                    labelText="Your Name*" helperFunction={handleChange} 
                    placeHolder="" name="name" 
                    type="text" id="name" />
                <FormElement 
                    labelText="Your Phone Number(with country code)*" helperFunction={handleChange} 
                    placeHolder="" name="phoneno" 
                    type="text" id="phoneno" />

                <label  className="block mb-2 text-sm font-medium text-secondary">{"Your Query"}</label>

                <textarea className="mb-5 bg-gray-50 border border-secondary text-grey-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="query" placeholder='Please enter your query' onChange={handleChange}/>

            <div className='w-full'>
                <button  className="bg-primary text-white px-5 py-3 w-full rounded-lg shadow-lg" type={'submit'}>Submit</button>
            </div>
            </form>
            {
                errorMsg.length==0?<></>:<div >
                <h1 className='relative items-center justify-center   text-red'>*{errorMsg}</h1>
            </div>
            }
            {
                success?<div >
                <h1 className='relative items-center justify-center   text-green'>{"*We will contact you shortly, loading..."}</h1>
            </div>:<></>
            }
 
            </div>
        </div>
    </div>
            </div>
        </div>
        <div>
            <LandingFooter/>
        </div>
        </>

    )
}
export default ContactUsForm