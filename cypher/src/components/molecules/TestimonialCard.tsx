import {FC} from 'react';
import Image from '../atoms/Image';
interface TestimonialCardProps{
    imgPath:string,
    name:string,
    designation:string,
    testimonial:string
}

const TestimonialCard:FC<TestimonialCardProps> = ({imgPath,name,designation,testimonial})=>{

    return (
    <div className='bg-white rounded shadow-md font-abhaya overflow-hidden'>
        <div className='flex px-5 pt-4'>
            <Image path={imgPath} altText={"Client"}/>
            <div className='px-5 '>
                <h1 className='text-secondary text-xl'>{name}</h1>
                <h2 className='text-grey '>{designation}</h2>
            </div>
        </div>
        <div className='px-5 py-5'>
            {testimonial}
        </div>
    </div>)

}
export default TestimonialCard;