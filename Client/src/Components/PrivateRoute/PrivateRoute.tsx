import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoute = () => {
    const {userInfo} = useSelector((state:any)=> state.auth);

  return userInfo ? <Outlet /> : <Navigate to='/' replace />
}