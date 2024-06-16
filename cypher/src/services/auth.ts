import axios from "../helpers/axios";
import { CLIENT_SIGNIN_ENDPOINT, CLIENT_SIGNUP_ENDPOINT, RESET_PASSWORD_ENDPOINT } from "../constants/endpoints";

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


 export const CLIENT_SIGNIN_REQUEST = (postData:{email:string,password:string}) =>{
    let promise = axios.post(CLIENT_SIGNIN_ENDPOINT,postData)
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
    console.log(promise)
    return promise;
 }


//  export const RESET_PASSWORD_REQUEST = async (postData:{email:string,password:string}, token: string ) =>{
//     let promise = axios.post(RESET_PASSWORD_ENDPOINT,postData,{
//         headers: { 'AUTH-TOKEN': token },
//       })
//                 .then(response=>{
//                     if('data' in response){
//                         return response.data
//                     }
//                     else{
//                         return "Something went wrong, please try again later."
//                     }
//                 })
//                 .catch(err=>{
//                     console.log(err)
//                     return "Something went wrong, please try again later."
//                 })
//     console.log(promise)
//     return promise;
//  }

 export const RESET_PASSWORD_REQUEST = async (postData:{email:string,password:string}, token: string) => {
    let promise = axios.post(
      RESET_PASSWORD_ENDPOINT,
      {
        postData,
      },
      {
        headers: {
          'AUTH-TOKEN': token,
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(promise)
    return promise;
  };