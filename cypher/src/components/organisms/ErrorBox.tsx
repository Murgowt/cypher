import { FC } from 'react';
import { Link } from 'react-router-dom';

import CypherButton from '../atoms/CypherButton';

export interface ErrorBoxProps {
  errorMessage: string;
  link: string;
  buttonText: string;
}

const helperFunction =() =>{
    console.log("Clicked on Helper Function.")
  }

const ErrorBox: FC<ErrorBoxProps> = ({ errorMessage, link, buttonText }) => {
  return (
    <div className="p-12 flex justify-center flex-col gap-6 items-center">
      <h1 className="text-lg font-medium text-center font-sans">
        {errorMessage}
      </h1>
      <div className="min-w-[150px]">
        <Link to={link}>
          <CypherButton placeHolder={buttonText} helperFunction={helperFunction}/>
        </Link>
      </div>
    </div>
  );
};

export default ErrorBox;
