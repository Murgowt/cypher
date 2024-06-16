import axios from "../helpers/axios";
import { CLIENT_CREATE_PROJECT } from "../constants/endpoints";

interface DataDeclaration {
    title: string,
    description:string,
    budget:number,
    tech:string[],
    milestones:number,
    file? : File
}
const CREATE_PROJECT_REQUEST =  (data:DataDeclaration,authToken:string, role:string) =>{
    
    var formData = new FormData();
    if(data.file){
        formData.append('file',data.file)
    }
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('milestones',String(data.milestones))
    formData.append('budget',String(data.budget))
    formData.append('tech',JSON.stringify(data.tech))
   
    let promise = axios.post(CLIENT_CREATE_PROJECT,data,{
        headers: {
        //   'Content-Type': 'multipart/form-data',
          'token':authToken,
          'user':role
          
        }
    })
    .then(response=>{
        if('data' in response){
            return response.data
        }
        else{
            return "Something went wrong, please try again later."
        }
    })
    .catch(err=>{
        console.log(err)
        return "Something went wrong, please try again later."
    })
    return promise
}


export default CREATE_PROJECT_REQUEST;