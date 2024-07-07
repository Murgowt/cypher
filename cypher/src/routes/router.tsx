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
import ResetPasswordPage from '../pages/Common/ResetPasswordPage';
import ManageProjectsPage from '../pages/Common/ManageProjectsPage';
import CypherDashboard from '../pages/Cypher/CypherDashboard';
import CypherLayout from '../layouts/CypherLayout';
import FindWorkPage from '../pages/Cypher/FindWorkPage'
import EnrollmentTest from '../pages/Cypher/EnrollmentTest';
import TestResultPage from '../pages/Cypher/TestResultPage';
import ViewProjectPage from '../pages/Cypher/ViewProjectPage';
import PaymentPage from '../pages/Client/PaymentPage';
import ContactUsForm from '../pages/ContactUsPage';


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
                    {
                        path:'enrollment_test',
                        element:<EnrollmentTest/>
                    },
                    {
                        path:'enrollment_test_result',
                        element:<TestResultPage/>
                    }
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
                    },
                    {
                        path:'view-project',
                        element:<ViewProjectPage/>
                    },
                    {
                        path:'payment',
                        element:<PaymentPage/>
                    }
                ]
            },
            //CYHPER
            {
                path:'cypher',
                element:<CypherLayout/>,
                children:[
                    {
                        path:'dashboard',
                        element:<CypherDashboard/>
                    },
                    {
                        path:'find-work',
                        element:<FindWorkPage/>
                    },
                    {
                        path:'manage-projects',
                        element:<ManageProjectsPage/> //Todo: Change it accordingly
                    },
                    {
                        path:'view-project',
                        element:<ViewProjectPage/>
                    },
                    {
                        path:'reset-password',
                        element:<ResetPasswordPage/>
                    }
                ]
            },
            //Contact Us Form
            {
              path:'contact-us',
              element:<ContactUsForm/>  
            },
             //404 Error
             {
                path:'*',
                element:<Error404Page/>
            },
        ]
    }
])

export default router;