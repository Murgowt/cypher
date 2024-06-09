import axios from "../helpers/axios";
import { CLIENT_SIGNUP_ENDPOINT } from "../constants/endpoints";

export const CLIENT_SIGNUP_REQUEST = (postData:{first_name:string,last_name:string, email:string, password:string}) =>{
    let promise = axios.post(CLIENT_SIGNUP_ENDPOINT,postData)
    .then(response=>{
        if('data' in response){
            if(response.data =='OK'){
                return 2
            }
            if(response.data == 'User with the email already exists, please login, please login'){
                return 1
            }
        }
        else{
            return 0
        }
    })
    .catch(err=>{
        console.log(err)
        return 0;
    })
    return promise
    // return axios.post(CLIENT_SIGNUP_ENDPOINT,postData)
 }