import axios from "../helpers/axios";
import { ALLORDERS_ENDPOINT, VIEWBIDS_ENDPOINT, PAYMENT_ENDPOINT, ACCEPT_BID_ENDPOINT } from "../constants/endpoints";

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

export const ACCEPTBID_REQUEST = async (data: any, bid: any, token: string, role: string) => {
  try {
    const response = await axios.post(ACCEPT_BID_ENDPOINT, {
      paymentId: data.orderID,
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
