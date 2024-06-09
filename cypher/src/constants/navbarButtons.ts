import { Dropdown } from '../interfaces/DropDown';
import { CLIENT, CYPHER } from '../constants/app';
import { CLIENT_SIGNUP, CYPHER_SIGNUP, CLIENT_SIGNIN, CYPHER_SIGNIN } from '../constants/routes.ui';

export const navbarSignupButton: Dropdown[] = [
  {
    text: CYPHER,
    link: CYPHER_SIGNUP,
  },
  {
    text: CLIENT,
    link: CLIENT_SIGNUP,
  },
];

export const navbarSigninButton: Dropdown[] = [
  {
    text: CYPHER,
    link: CYPHER_SIGNIN,
  },
  {
    text: CLIENT,
    link: CLIENT_SIGNIN,
  },
];

