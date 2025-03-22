import { createRoot } from 'react-dom/client'
import {ContextProvider} from './context/ContextProvider.jsx'
import {RouterProvider} from 'react-router-dom'
import router from './router/Router.jsx'

createRoot(document.getElementById('root')).render(
 
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>

    </ContextProvider>
 
)
