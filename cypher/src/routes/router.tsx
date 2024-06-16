import {createBrowserRouter} from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';
import ClientSignUpPage from '../pages/Authentication/ClientSignUpPage';
import AuthLayout from '../layouts/AuthLayout';
import ClientSignInPage from '../pages/Authentication/ClientSignInPage';
import CypherSignUpPage from '../pages/Authentication/CypherSignUpPage';
import CypherSignInPage from '../pages/Authentication/CypherSignInPage';
import ClientLayout from '../layouts/ClientLayout';
import Error404Page from '../pages/Error404Page';
import ClientDashboard from '../pages/Client/ClientDashboardPage';
import PostWorkPage from '../pages/Client/PostWorkPage';
import ResetPasswordPage from '../pages/Client/ResetPasswordPage';
import ManageProjectsPage from '../pages/Client/ManageProjectsPage';


const router = createBrowserRouter([
        {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            //HOME PAGE
            {
                path:'',
                element:<HomePage/>
            },
            //AUTH
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
            },
            //CLIENT 
            {
                path:'client',
                element:<ClientLayout/>,
                children:[
                    {
                        path:'dashboard',
                        element: <ClientDashboard/>
                    },

                    {
                        path:'post-work',
                        element:<PostWorkPage/>
                    },
                    {
                        path:'reset-password',
                        element:<ResetPasswordPage/>
                    },
                    {
                        path:'manage-projects',
                        element: <ManageProjectsPage/>
                    }
                ]
            },
            //404 Error
            {
                path:'*',
                element:<Error404Page/>
            }
        ]
    }
])

export default router;