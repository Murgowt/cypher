import {FC} from 'react';
import Navbar from '../components/molecules/Navbar';
import LandingFooter from '../components/molecules/LandingFooter';
import Image from '../components/atoms/Image';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE } from '../constants/routes.ui';

interface Error404PageProps {}

const Error404Page:FC<Error404PageProps> = () =>{
    const imgPath = '/images/Error404.png'
    const navigate = useNavigate()
    const handleButtonClick = () =>{
        navigate(HOME_PAGE)
    }
    return(
            <div className="">

                <div className="py-3">
                    <Navbar/>
                </div>
                    
                <div className='flex justify-center items-center mb-8'>
                    <div className='w-[35%]'>
                        <Image path={imgPath} altText={"Error404"} />
                    </div>
                </div>
                <div className='flex justify-center items-center content-center mb-5'>
                    <h1 className='  font-abhaya text-secondary text-md desktop:text-xl tablet:text-lg w-[50%]'>The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.</h1>
                </div>
                <div className='flex justify-center items-center content-center'>
                <button className="bg-secondary text-white px-4 py-2 text-sm rounded-lg shadow-lg w-[60%] desktop:w-[30%] " onClick={handleButtonClick} >
                    Go To Home
                </button>
                </div>
                <div className="tablet:relative bottom-0 monitor:relative pt-10">
                    <LandingFooter/>
                </div>

            </div>
    )
}

export default Error404Page;