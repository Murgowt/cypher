import axios from "axios";
import { CLIENT_SIGNUP_ENDPOINT } from "../constants/endpoints";

export const CLIENT_SIGNUP_REQUEST = async(postData:{first_name:string,last_name:string, email:string, password:string}) =>{
    console.log("CLIENT_SIGNUP_REQUEST",postData)
    // return axios.post(CLIENT_SIGNUP_ENDPOINT,postData)
 }