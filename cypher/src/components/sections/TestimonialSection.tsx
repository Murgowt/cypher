import {FC} from 'react';
import Image from '../atoms/Image';
import TestimonialCard from '../molecules/TestimonialCard';
interface TestimonialSectionProps{}

const TestimonialSection: FC<TestimonialSectionProps> =() =>{
    let Testicals = '/images/Qotes.png'
    let client1 = '/images/Client1.png'
    let client2 = '/images/Client2.png'
    return(
        <div className='pb-10'>
           <div>
                <h1 className="text-center text-2xl text-secondary font-abhaya font-extrabold tablet:text-left tablet:text-lg desktop:text-2xl">
                    Testimonials
                </h1>
                <div className="absolute overflow-hidden tablet:m-10">
                    <Image path={Testicals} altText="Testimonials" />
                </div>
                <div className="flex grid grid-cols-1 tablet:grid-cols-2 gap-10 mt-20 ml-10 tablet:mt-32 tablet:ml-40 tablet:pr-10">
                    <div className="relative">
                        <TestimonialCard imgPath={client1} name={"Tristian"} designation={"SDE @ Blinklist"} testimonial={"Cypher has been a great help for me to help understand, guide and teach me machine learning. The crew is really very prompt and helpful and ofcourse extremely talented!"}/>
                    </div>
                        <TestimonialCard imgPath={client2} name={"Chris"} designation={"SWE @ Laxful"} testimonial={"Cypher is a life saviour! The cypher team has saved me countless times when my back was against the wall and I was running low on time and the deadlines were on my head."}/>
                </div>
           </div>
        </div>
    )
}

export default TestimonialSection;