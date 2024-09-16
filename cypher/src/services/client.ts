import axios from "../helpers/axios";
import { ALLORDERS_ENDPOINT, VIEWBIDS_ENDPOINT, PAYMENT_ENDPOINT, ACCEPT_BID_ENDPOINT, UPDATEMILESTONE_ENDPOINT, CLOSEORDER_ENDPOINT , GETPROJECTDETAILS_ENDPOINT , GIVERATING_ENDPOINT, CLIENT_ATTACHMENTS_ENDPOINT, PROJECTDETAILS_ENDPOINT, CHATMAIL_ENDPOINT} from "../constants/endpoints";

export const ALLORDERS_REQUEST = async (token: string, role: string) =>{
    let promise = axios.get(ALLORDERS_ENDPOINT, {
        headers: { 'token': token, 'user': role },
      });
    return promise;
 };

 export const PROJECTDETAILS_REQUEST = async (orderId: string, token: string, role: string) =>{
  let promise = axios.get(PROJECTDETAILS_ENDPOINT(orderId), {
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

export const CREATEORDER_REQUEST = async (token: string, role: string) => {
  try {
    const response = await axios.post(PAYMENT_ENDPOINT, {
      amount: 1
    }, {
      headers: { 'token': token, 'user': role },
    });
    return response.data.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const ACCEPTBID_REQUEST = async ( bid: any, token: string, role: string) => {
  try {
    const response = await axios.post(ACCEPT_BID_ENDPOINT, {
      orderId: bid.orderId,
      wizardId: bid.wizardId,
      finalBudget: bid.budget,
    }, {
      headers: { 'token': token, 'user': role },
    });
    return response.data;
  } catch (error) {
    console.error('Error approving payment:', error);
    throw error;
  }
};

export const UPDATEMILESTONE_REQUEST = async (postData:{orderId:string}, token: string, role: string ) =>{
  let promise = axios.post(UPDATEMILESTONE_ENDPOINT,postData,{
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

export const CLOSEORDER_REQUEST = async (postData:{orderId:string}, token: string, role: string ) =>{
  let promise = axios.post(CLOSEORDER_ENDPOINT,postData,{
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

export const GETPROJECTDETAILS_REQUEST = async (orderId: string, token: string, role: string) =>{
  let promise = axios.get(GETPROJECTDETAILS_ENDPOINT(orderId), {
      headers: { 'token': token, 'user': role },
    });
  return promise;
};

export const GIVERATING_REQUEST = async (postData:{rating: number, wizardId: string}, token: string, role: string ) =>{
  let promise = axios.post(GIVERATING_ENDPOINT,postData,{
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

export const ATTACHMENTS_REQUEST = async (key: string, token: string, role: string) =>{
  let promise = axios.get(CLIENT_ATTACHMENTS_ENDPOINT(key), {
      headers: { 'token': token, 'user': role },
    });
    console.log(promise)
  return promise;
};

export const CHATMAIL_REQUEST = async (postData:{id:string,user:string}, token: string, role: string ) =>{
  let promise = axios.post(CHATMAIL_ENDPOINT,postData,{
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

