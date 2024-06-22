//Backend Endpoints
export const CLIENT_SIGNUP_ENDPOINT      = "client/register";
export const CLIENT_SIGNIN_ENDPOINT      = "client/login";
export const ALLORDERS_ENDPOINT          = "client/allorders";
export const RESET_PASSWORD_ENDPOINT     = "client/editprofile";
export const CLIENT_CREATE_PROJECT       = "client/order";
export const VIEWBIDS_ENDPOINT           = (orderId: string) => `client/bids/${orderId}`;

export const CYPHERORDERS_ENDPOINT       = "wizard/allorders";
export const FINDWORK_ENDPOINT           = "wizard/market";
export const CYPHER_ENROLL               = "wizard/register";
export const CYPHER_SIGNIN_ENDPOINT      = "wizard/login";
export const PLACE_BID_ENDPOINT          = "wizard/bid";