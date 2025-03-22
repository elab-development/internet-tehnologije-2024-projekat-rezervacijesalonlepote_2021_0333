import { useStateContext } from "../../context/ContextProvider";
import {Outlet, Navigate} from 'react-router-dom'

export default function GuestRoute() {
    const { token } = useStateContext();
    return !token ? <Outlet></Outlet> : <Navigate to='/dashboard' replace></Navigate>;
}