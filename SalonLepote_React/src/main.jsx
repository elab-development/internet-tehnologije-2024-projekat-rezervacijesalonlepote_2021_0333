import { createRoot } from 'react-dom/client'
import {ContextProvider} from './context/ContextProvider.jsx'
import {RouterProvider} from 'react-router-dom'
import router from './router/Router.jsx'
import "./assets/css/bootstrap.min.css"; 
import "./assets/css/custom.css"; 

createRoot(document.getElementById('root')).render(
 
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>

    </ContextProvider>
 
)
