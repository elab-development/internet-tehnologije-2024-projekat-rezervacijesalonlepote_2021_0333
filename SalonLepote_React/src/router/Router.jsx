import { createBrowserRouter } from 'react-router-dom'
import  DefaultLayout from '../components/layouts/DefaultLayout.jsx'
import  GuestLayout  from '../components/layouts/GuestLayout.jsx'
import Pocetna from "../views/Pocetna.jsx"
import LoginPage from '../views/LoginPage.jsx'
import RegisterPage from '../views/RegisterPage.jsx'
import UslugePage from '../views/UslugePage.jsx'


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout></DefaultLayout>,
        children: [
            {
                path: '/pocetna',
                element: <Pocetna></Pocetna>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout></GuestLayout>,
        children: [
            {
                path: '/pocetna',
                element: <Pocetna></Pocetna>
            },
            {
                path: '/login',
                element:<LoginPage></LoginPage>
            },
            {
                path: '/register',
                element:<RegisterPage></RegisterPage>
            },
            {
                path: '/tipusluge',
                element:<UslugePage></UslugePage>
            }
        ]
    }
]);

export default router;