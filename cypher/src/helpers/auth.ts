import { jwtDecode } from 'jwt-decode';

import { AuthToken } from '../interfaces/AuthToken';

export const validAuthToken = (token: string): boolean => {
  const decodedToken: AuthToken = jwtDecode(token);
  const { exp } = decodedToken;

  const expiryDate = new Date(exp * 1000);
  const now = new Date();
  
  return now < expiryDate;
};