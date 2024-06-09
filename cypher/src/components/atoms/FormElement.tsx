import {FC} from 'react';

interface FormElementProps{
    labelText:string,
    helperFunction: (e:any) => void,
    placeHolder : string,
    name:string,
    type:string,
    id:string
};

const FormElement:FC<FormElementProps> = ({labelText,helperFunction,placeHolder,name,type,id})=>{
    return(
        <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-secondary">{labelText}</label>
                <input name={name} onChange={helperFunction} type={type} id={id} className="bg-gray-50 border border-secondary text-grey-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeHolder} required />
        </div>
    )
}

export default FormElement;