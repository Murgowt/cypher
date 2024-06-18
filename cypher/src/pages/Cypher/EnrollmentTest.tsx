import {FC, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import questions from '../../constants/enrollmentQuestions';
import QuestionItem from '../../components/molecules/QuestionItem';

interface EnrollmentTestProps {}
interface StateDeclaration {
    [key:string]:string
}

const EnrollmentTest:FC<EnrollmentTestProps> = () =>{
    const [answers,SetAnswers]= useState<StateDeclaration>({}); 
    var location = useLocation();
    const [errorMsg,setErrorMsg] = useState('');
    useEffect(()=>{
        let data= answers
        for (let i=0;i<questions.length;i++){
            data[String(questions[i].questionId)]=questions[i].options[0]
        }
        SetAnswers(data);
        console.log(location)
    },[])

    const handleChange = (key:string,value:string) =>{
        SetAnswers({...answers,[key]:value})
    }
    
    const handleSubmit = (e:any)=>{
        e.preventDefault()
        for (const key in answers)
            {
               if(answers[key]==""){

               }
            }
        setErrorMsg("Please answer all questions");
        return
    }
    //BACKEND CALL HERE

    useEffect(()=>{
        console.log(answers)
    },[answers])

    return (
        <div className='flex items-start justify-center '>
            <div className='tablet:px-[5rem]  bg-white border-secondary shadow-xl rounded overflow-hidden 
                            tablet:w-[80%] desktop:w-[60%] py-10 '>
                <form>
                {questions.map((question,index)=> 
                            <div className='max-h-fit' key={index} >
                                <QuestionItem imagePath={question.questionImage} 
                                                                question={question.question} 
                                                                options={question.options}    
                                                                
                                                                questionId={String(question.questionId)}
                                                                parentFunction = {handleChange}
                                                                />
                            </div>)}
                    <div className='w-full'>
                     <button className="bg-secondary text-white px-5 py-3 w-full rounded-lg shadow-lg" onClick={handleSubmit} >Create New Project</button>
                    </div>
                </form>
                {
                    errorMsg.length==0?<></>:<div >
                    <h1 className='relative items-center justify-center   text-red'>*{errorMsg}</h1>
                </div>
                }
            </div>
            
        </div>
    )
}

export default EnrollmentTest;
