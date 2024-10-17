import { useState, useRef, useEffect } from 'react';
import { User, Bell, Settings, LogOut, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logout } from '../../Redux/slice/userSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  role: string;
}

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); 
  const dispatch = useDispatch();
  const [role, setRole] = useState<string | null>(null); 

  const { userInfo } = useSelector((state: any) => state.auth);  

  useEffect(() => {
    if (userInfo.token) {
      const decodedToken: TokenPayload = jwtDecode(userInfo.token);
      setRole(decodedToken.role); // Set role based on decoded token
    }
  }, [userInfo]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
  };

  const navbarBgColor = role === 'payer' ? 'bg-blue-500' : 'bg-l-blue'; 
  const navbarTitle = role === 'payer' ? 'InsuranceDash' : 'HealthDash';
  const link = role === 'payer' ? 'insurance/dashboard' : '/dashboard'; 

  return (
    <nav className={`${navbarBgColor} p-4 shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to={link}>
        <div className="text-white font-bold text-xl">{navbarTitle}</div>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Render Bell and Settings only for provider */}
          {role === 'provider' && (
            <>
              <button className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300">
                <Bell size={20} />
              </button>
              <button className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300">
                <Settings size={20} />
              </button>
            </>
          )}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300"
              onClick={toggleDropdown}
            >
              <User size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {/* Dropdown content for provider */}
                {role === 'provider' && (
                  <>
                    <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Users size={16} className="mr-2" /> Patients
                    </Link>
                    <Link to="/prior-auth" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <FileText size={16} className="mr-2" /> Prior Authorization
                    </Link>
                  </>
                )}
                {/* For both provider and payer, show logout */}
                <li onClick={handleLogout} className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <LogOut size={16} className="mr-2" /> Logout
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
