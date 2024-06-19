import {FC, useEffect, useState} from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import questions from '../../constants/enrollmentQuestions';
import QuestionItem from '../../components/molecules/QuestionItem';
import { CYPHER_SIGNUP_REQUEST } from '../../services/auth';
import { CYPHER_TEST_RESULT_PAGE } from '../../constants/routes.ui';

interface EnrollmentTestProps {}
interface StateDeclaration {
    [key:string]:string
}

const EnrollmentTest:FC<EnrollmentTestProps> = () =>{
    const [answers,SetAnswers]= useState<StateDeclaration>({}); 
    const navigate = useNavigate();
    var location = useLocation();
    const [errorMsg,setErrorMsg] = useState('');
    useEffect(()=>{
        let data= answers
        for (let i=0;i<questions.length;i++){
            data[String(questions[i].questionId)]=questions[i].options[0]
        }
        SetAnswers(data);
    },[])

    const handleChange = (key:string,value:string) =>{
        SetAnswers({...answers,[key]:value})
    }
    
    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        for (const key in answers)
            {
               if(answers[key]==""){
                setErrorMsg("Please answer all questions");
                return
               }
            }
        var result = await CYPHER_SIGNUP_REQUEST(location.state,answers);
        console.log(result)
        navigate(CYPHER_TEST_RESULT_PAGE,{state:{code:result}})
        
    }
    
   
   
 
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
