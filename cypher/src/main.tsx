import React from 'react'
import ReactDOM from 'react-dom/client'
// Defaults to weight 400

import './index.css'
import {RouterProvider} from 'react-router-dom'
import router from './routes/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
