import { useStateContext } from "../../context/ContextProvider";
import {Outlet, Navigate} from 'react-router-dom'

export default function ProtectedRoute() {
    const { token } = useStateContext();
    return token ? <Outlet></Outlet> : <Navigate to='/auth/pocetna' replace></Navigate>;
}