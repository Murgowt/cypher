//Backend Endpoints
export const CLIENT_SIGNUP_ENDPOINT      = "client/register";
export const CLIENT_SIGNIN_ENDPOINT      = "client/login";
export const ALLORDERS_ENDPOINT          = "client/allorders";
export const RESET_PASSWORD_ENDPOINT     = "client/editprofile";
export const CLIENT_CREATE_PROJECT       = "client/order";
export const VIEWBIDS_ENDPOINT           = (orderId: string) => `client/bids/${orderId}`;
export const PAYMENT_ENDPOINT            = "client/pay";
export const ACCEPT_BID_ENDPOINT         = "client/acceptbid";

export const CYPHERORDERS_ENDPOINT       = "wizard/allorders";
export const FINDWORK_ENDPOINT           = "wizard/market";
export const CYPHER_ENROLL               = "wizard/register";
export const CYPHER_SIGNIN_ENDPOINT      = "wizard/login";
export const PLACE_BID_ENDPOINT          = "wizard/bid";
export const ATTACHMENTS_ENDPOINT           = (key: string) => `wizard/orderattachments/${key}`;
export const CYPHER_RESET_PASSWORD_ENDPOINT     = "wizard/editprofile";
export const CYPHER_FILE_UPLOAD                 = "wizard/orderattachments"