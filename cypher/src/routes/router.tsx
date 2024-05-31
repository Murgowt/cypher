
import {createBrowserRouter} from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
        {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'',
                element:<HomePage/>
            }
        ]
    }
])

export default router;