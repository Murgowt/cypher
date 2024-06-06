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
                <div >
                    
                    <div className="flex grid grid-cols-1 tablet:grid-cols-3 gap-10  ">
                    <div className='  tablet:pl-[10%]'>
                        <Image path={ Testicals} altText="Testimonials"/>
                    </div>
                        <TestimonialCard imgPath={client1 }name={"Esther Hills"} designation={"CEO @ Paradowski"} testimonial={"Omnis totam molestiae delectus nemo alias nesciunt harum et. Nobis dolorum excepturi quod vel. Sunt est qui ab non dolores repellat rem impedit dolores. "}/>
                        <TestimonialCard imgPath={client2 }name={"Sankeerth Siram"} designation={"CEO @ BoltAbacus"} testimonial={"Omnis totam molestiae delectus nemo alias nesciunt harum et. Nobis dolorum excepturi quod vel. Sunt est qui ab non dolores repellat rem impedit dolores. "}/>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default TestimonialSection;