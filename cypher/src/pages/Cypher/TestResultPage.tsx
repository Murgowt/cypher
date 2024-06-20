import {FC} from 'react'
import { useLocation } from 'react-router-dom';
import Image from '../../components/atoms/Image';

interface TestResultProps {}

const TestResultPage :FC<TestResultProps> =()=>{
    let location = useLocation();
   
    return (
        <div className='flex items-start justify-center '>
        <div className='tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden 
                        tablet:w-[80%] desktop:w-[60%] py-10 '>
           <div>
                <Image path="/images/banner.png" altText="Logo" />
           </div>
           
           <div className='flex items-start justify-center '>
                {location.state.code==200?<h1 className='text-xl text-secondary'>You are successfully signed in. Please head to the login page</h1>:
                location.state.code==400?<h1 className='text-xl text-red'>Sorry, you have failed the test. Please try after 24 hours.</h1>:
                <h1 className='text-xl text-grey'>Something went wrong please try again later.</h1>}

           </div>
        </div>
        
    </div>
    )
}

export default TestResultPage;