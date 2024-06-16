import axios from "../helpers/axios";
import { CLIENT_CREATE_PROJECT } from "../constants/endpoints";

// const upload = (file:File) : Promise<any> =>{
//     let formData = new FormData();
//     formData.append("file",file)

//     return axios.post(CLIENT_CREATE_PROJECT,formData,{
//         headers:{
//             "Content-Type":"multipart/form-data"
//         }
//     });
// }

// const getFiles = () :Promise<any> =>{
//     return axios.get("/files");
// }

// const FileUploadService = {
//     upload,
//     getFiles
// }

// export default FileUploadService;
interface DataDeclaration {
    title: string,
    description:string,
    budget:number,
    tech:string[],
    milestones:number,
    file? : File
}
const CREATE_PROJECT_REQUEST = (data:DataDeclaration) =>{
    console.log("CREATE PROJECT")
    var formData = new FormData();
    if(data.file){
        formData.append('file',data.file)
    }
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('milestones',String(data.milestones))
    formData.append('budget',String(data.budget))
    formData.append('tech',JSON.stringify(data.tech))
    axios.post(CLIENT_CREATE_PROJECT,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}

export default CREATE_PROJECT_REQUEST;