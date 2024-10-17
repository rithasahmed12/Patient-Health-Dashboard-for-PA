import { useState, useRef, useEffect } from 'react';
import { User, Bell, Settings, LogOut, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); 

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

  return (
    <nav className="bg-l-blue p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">HealthDash</div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300">
            <Bell size={20} />
          </button>
          <button className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300">
            <Settings size={20} />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button 
              className="text-white hover:bg-lh-blue p-2 rounded-full transition duration-300"
              onClick={toggleDropdown}
            >
              <User size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Users size={16} className="mr-2" /> Patients
                </Link>
                <Link to="/prior-auth" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <FileText size={16} className="mr-2" /> Prior Authorization
                </Link>
                <Link to="/logout" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <LogOut size={16} className="mr-2" /> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
