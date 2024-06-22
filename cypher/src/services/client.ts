import axios from "../helpers/axios";
import { ALLORDERS_ENDPOINT, VIEWBIDS_ENDPOINT } from "../constants/endpoints";

export const ALLORDERS_REQUEST = async (token: string, role: string) =>{
    let promise = axios.get(ALLORDERS_ENDPOINT, {
        headers: { 'token': token, 'user': role },
      });
    return promise;
 };

 export const VIEWBIDS_REQUEST = async (orderId: string, token: string, role: string) =>{
  let promise = axios.get(VIEWBIDS_ENDPOINT(orderId), {
      headers: { 'token': token, 'user': role },
    });
  return promise;
};