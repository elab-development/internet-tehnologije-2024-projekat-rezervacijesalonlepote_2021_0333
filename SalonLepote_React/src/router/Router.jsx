import { createBrowserRouter } from 'react-router-dom'
import  DefaultLayout from '../components/layouts/DefaultLayout.jsx'
import  GuestLayout  from '../components/layouts/GuestLayout.jsx'
import Pocetna from "../views/Pocetna.jsx"
import LoginPage from '../views/LoginPage.jsx'
import RegisterPage from '../views/RegisterPage.jsx'
import UslugePage from '../views/UslugePage.jsx'
import MojiPodaciPage from '../views/MojiPodaciPage.jsx'
import ZakaziTerminPage from '../views/ZakaziTerminPage.jsx'
import MojiTerminiPage from "../views/MojiTerminiPage.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout></DefaultLayout>,
        children: [
            {
                index:true,
                element: <Pocetna></Pocetna>
            },
            {
                path: "/mojiPodaci",
                element: <MojiPodaciPage></MojiPodaciPage>
            },
            {
                path: "/zakaziTermin",
                element: <ZakaziTerminPage></ZakaziTerminPage>
            },
            {
                path: "/mojiTermini",
                element: <MojiTerminiPage></MojiTerminiPage>
            }
        ]
    },
    {
        path: '/auth',
        element: <GuestLayout></GuestLayout>,
        children: [
            {
                path: 'pocetna',
                element: <Pocetna></Pocetna>
            },
            {
                path: 'login',
                element:<LoginPage></LoginPage>
            },
            {
                path: 'register',
                element:<RegisterPage></RegisterPage>
            },
            {
                path: 'tipusluge',
                element:<UslugePage></UslugePage>
            }
        ]
    }
]);

export default router;