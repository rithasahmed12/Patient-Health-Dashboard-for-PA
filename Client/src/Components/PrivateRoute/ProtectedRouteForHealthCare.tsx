import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { logout } from "../../Redux/slice/userSlice";


interface DecodedToken {
  role: string;
  _id: string;
}

interface UserInfo {
  token: string;
}

interface RootState {
  auth: {
    userInfo: UserInfo | null;
  };
}

const ProtectedRouteForHealthCare = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  if (userInfo && userInfo.token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(userInfo.token);

      if (decodedToken.role === "provider") {
        return <Outlet />; 
      } else {
        return <Navigate to="/insurance/dashboard" />;
      }
    } catch (error) {
      console.error("Invalid token", error);
      dispatch(logout());
      return <Navigate to="/" />;
    }
  } else {
    dispatch(logout());
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteForHealthCare;
