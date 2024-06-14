import {createBrowserRouter} from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';
import ClientSignUpPage from '../pages/Authentication/ClientSignUpPage';
import AuthLayout from '../layouts/AuthLayout';
import ClientSignInPage from '../pages/Authentication/ClientSignInPage';
import CypherSignUpPage from '../pages/Authentication/CypherSignUpPage';
import CypherSignInPage from '../pages/Authentication/CypherSignInPage';
import ClientLayout from '../layouts/ClientLayout';
import ClientDashboard from '../pages/Client/ClientDashboardPage';
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
                    }
                ]
            }
        ]
    }
])

export default router;