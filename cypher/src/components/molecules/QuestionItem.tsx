import {FC} from 'react'
import Image from '../atoms/Image'
interface QuestionItemProps {
    imagePath :string,
    question : string,
    options: string[],
    questionId:string,
    parentFunction: (key:string,value:string)=>void
}

const QuestionItem : FC<QuestionItemProps> = ({imagePath,question,options,questionId,parentFunction}) =>{
    const handleChange = (e:any) =>{
        parentFunction(questionId,e.target.value)
    }
    return(
        <div className='border-b-2 border-lightgrey'>
            <div className='text-xl mb-5 text-secondary'>
                {'Question '+questionId}
            </div>
            <div className='mb-5'>
                {
                    imagePath!="None"? <Image path={imagePath} altText={"Question image"}/> :<></>
                }
            </div>
            <h1 className='font-abhaya text-lg mb-5'>
                {question}
            </h1>
            <select name={questionId} className='text-lg mb-10 text-primary' defaultValue={options[0]} onChange={handleChange}>
                {options.map((optionValue)=> 
                            <option value={optionValue} key={optionValue}>
                                {optionValue}
                            </option>)}
            </select>
        </div>
    )
}

export default QuestionItem 