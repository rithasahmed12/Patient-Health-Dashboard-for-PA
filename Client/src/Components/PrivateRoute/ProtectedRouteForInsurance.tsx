import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode
import { logout } from "../../Redux/slice/userSlice";

// Define the structure of the decoded token
interface DecodedToken {
  role: string;
  _id: string;
}

// Define the structure of userInfo in Redux state
interface UserInfo {
  token: string;
}

interface RootState {
  auth: {
    userInfo: UserInfo | null;
  };
}

const ProtectedRouteForInsurance = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  
  if (userInfo && userInfo.token) {
      try {
          const decodedToken = jwtDecode<DecodedToken>(userInfo.token);
          
          if (decodedToken.role === "payer") {
              return <Outlet />; 
            } else {
                return <Navigate to="/dashboard" />;
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

export default ProtectedRouteForInsurance;
