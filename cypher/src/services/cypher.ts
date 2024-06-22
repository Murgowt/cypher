import axios from "../helpers/axios";
import { CYPHERORDERS_ENDPOINT, FINDWORK_ENDPOINT, PLACE_BID_ENDPOINT } from "../constants/endpoints";

export const CYPHERORDERS_REQUEST = async (token: string, role: string) =>{
    let promise = axios.get(CYPHERORDERS_ENDPOINT, {
        headers: { 'token': token, 'user': role },
      });
    return promise;
 };

 export const FINDWORK_REQUEST = async (token: string, role: string) =>{
  let promise = axios.get(FINDWORK_ENDPOINT, {
      headers: { 'token': token, 'user': role },
    });
  return promise;
};

export const PLACE_BID_REQUEST = async (postData:{orderId:string,budget:number}, token: string, role: string ) =>{
  let promise = axios.post(PLACE_BID_ENDPOINT,postData,{
      headers: { 'token': token, 'user': role },
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
  console.log(promise)
  return promise;
}