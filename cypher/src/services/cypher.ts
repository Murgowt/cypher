import axios from "../helpers/axios";
import { CYPHERORDERS_ENDPOINT, FINDWORK_ENDPOINT } from "../constants/endpoints";

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