import axios from "../helpers/axios";
import { ALLORDERS_ENDPOINT } from "../constants/endpoints";

export const ALLORDERS_REQUEST = async (token: string) =>{
    let promise = axios.get(ALLORDERS_ENDPOINT, {
        headers: { 'AUTH-TOKEN': token },
      });
    return promise;
 };