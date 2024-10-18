import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Login as LoginAPI } from '../../api/api'; // Make sure to import your Login API function
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../Redux/slice/userSlice';
import { jwtDecode } from 'jwt-decode';

interface LoginFormValues {
  email: string;
  password: string;
}

interface TokenPayload {
  role: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {userInfo} = useSelector((state:any)=> state.auth);
  useEffect(()=>{
    if(userInfo){
      navigate("/dashboard");
    }

  },[])

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setIsLoading(true); 
    
    try {
      const response = await LoginAPI({
        email: values.email,
        password: values.password,
      });
  
      console.log('response:', response);
  
      if (response && response.status === 200) {
        toast.success("Login Successful!");
  
        const token = response.data.token;
        
        // Decode the token to extract the role
        const decodedToken: TokenPayload = jwtDecode(token);
  
        // Dispatch credentials to Redux or handle however needed
        dispatch(setCredentials(response.data));
  
        // Navigate based on the role
        if (decodedToken.role === 'provider') {
          navigate('/dashboard');
        } else if (decodedToken.role === 'payer') {
          navigate('/insurance/dashboard'); 
        } else {
          toast.error('Invalid role. Please contact support.');
        }
  
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
        toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[500px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center">
      <h2 className="mb-8 text-xl font-semibold text-center">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <div className="mb-10 mx-7">
              <label htmlFor="email" className="block mb-1">Email*</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-10 mx-7 relative">
              <label htmlFor="password" className="block mb-1">Password*</label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="****** min 6 digit"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-4 flex items-center"
              >
                {showPassword ? <EyeOff size={20} color="#4db2b8" /> : <Eye size={20} color="#4db2b8" />}
              </button>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-2 mx-9">
              <button
                type="submit"
                className="w-full py-1 bg-l-blue text-white rounded hover:bg-lh-blue transform duration-500 flex items-center justify-center"
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    <span className="ml-2">Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-l-blue hover:underline">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
