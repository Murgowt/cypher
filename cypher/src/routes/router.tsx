import {createBrowserRouter} from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';
import ClientSignUpPage from '../pages/Authentication/ClientSignUpPage';
import AuthLayout from '../layouts/AuthLayout';
import ClientSignInPage from '../pages/Authentication/ClientSignInPage';
import CypherSignUpPage from '../pages/Authentication/CypherSignUpPage';
import CypherSignInPage from '../pages/Authentication/CypherSignInPage';

const router = createBrowserRouter([
        {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'',
                element:<HomePage/>
            },
            {
                path:'auth',
                element:<AuthLayout/>,
                children:[
                    {
                        path:'client-signup',
                        element:<ClientSignUpPage/>
                    },
                    {
                        path:'client-signin',
                        element:<ClientSignInPage/>
                    },
                    {
                        path:'cypher-signup',
                        element:<CypherSignUpPage/>
                    },
                    {
                        path:'cypher-signin',
                        element:<CypherSignInPage/>
                    },
                ]
            }
        ]
    }
])

export default router;