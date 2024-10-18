import { useState } from 'react';
import { FaClipboard } from 'react-icons/fa'; 
import { toast} from 'react-hot-toast';
import Login from '../Components/Auth/Login';

const LoginPage = () => {
  const [showCredentials, setShowCredentials] = useState<boolean>(false); 
  const [copiedItem, setCopiedItem] = useState<string>(''); 

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied!`);
    setCopiedItem(text);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="hidden lg:flex flex-col justify-left items-start p-6 bg-gray-100 rounded-md lg:mr-12 md:mr-8 sm:mr-4 transform -translate-x-2">
        <button
          className="mb-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
          onClick={() => setShowCredentials(!showCredentials)}
        >
          {showCredentials ? 'Hide Credentials' : 'Show Credentials'}
        </button>

        {showCredentials && (
          <div className="text-left">
            <div className="mb-4">
              <p><strong>Healthcare Providers:</strong></p> 
              <button
                className={`mr-2 px-3 py-1 mb-1 ${
                  copiedItem === 'rithasnew@gmail.com' ? 'bg-gray-300' : 'bg-gray-200'
                } text-black rounded flex items-center transition-colors`}
                onClick={() => handleCopy('rithasnew@gmail.com', 'Email')}
              >
                <FaClipboard/> Copy Email
              </button>
              <button
                className={`px-3 py-1 ${
                  copiedItem === '123456' ? 'bg-gray-300' : 'bg-gray-200'
                } text-black rounded flex items-center transition-colors`}
                onClick={() => handleCopy('123456', 'Password')}
              >
                <FaClipboard /> Copy Password
              </button>
            </div>

            <div>
              <p><strong>Insurance Payers:</strong></p>
              <button
                className={`mr-2 px-3 py-1 mb-1 ${
                  copiedItem === 'ahmedrithas48@gmail.com' ? 'bg-gray-300' : 'bg-gray-200'
                } text-black rounded flex items-center transition-colors`}
                onClick={() => handleCopy('ahmedrithas48@gmail.com', 'Email')}
              >
                <FaClipboard/> Copy Email
              </button>
      
              <button
                className={`px-3 py-1 ${
                  copiedItem === '123456' ? 'bg-gray-300' : 'bg-gray-200'
                } text-black rounded flex items-center transition-colors`}
                onClick={() => handleCopy('123456', 'Password')}
              >
                <FaClipboard/> Copy Password
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login form in the center (aligned left on larger screens) */}
      <div className="flex items-center justify-center lg:justify-start">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
