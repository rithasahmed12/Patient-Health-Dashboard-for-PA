import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Signup as SignupAPI } from '../../api/api';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../Redux/slice/userSlice';



const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.string().oneOf(['provider', 'payer'], 'Invalid role').required('Role is required'),
});

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const {userInfo} = useSelector((state:any)=> state.auth);
  useEffect(()=>{
    if(userInfo){
      navigate("/dashboard");
    }
  },[])


  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string; role: string }, { setSubmitting }: any) => {
    try {
      const response = await SignupAPI({
        email: values.email,
        password: values.password,
        role: values.role as 'provider' | 'payer'
      });
      if (response && response.status === 201) {
        toast.success("Signup Successfull!");
        dispatch(setCredentials(response.data));
        navigate('/');
      } else {
        toast.error('An error occurred during signup');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[600px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center">
      <h2 className="mb-8 text-xl font-semibold text-center">Sign Up</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', role: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <div className="mb-6 mx-7">
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

            <div className="mb-6 mx-7">
              <label className="block mb-1">Role*</label>
              <div>
                <label>
                  <Field
                    type="radio"
                    name="role"
                    value="provider"
                  />
                  Healthcare Provider
                </label>
                <label className="ml-4">
                  <Field
                    type="radio"
                    name="role"
                    value="payer"
                  />
                  Insurance Payer
                </label>
              </div>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-6 mx-7 relative">
              <label htmlFor="password" className="block mb-1">Password*</label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="****** min 6 characters"
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

            <div className="mb-6 mx-7 relative">
              <label htmlFor="confirmPassword" className="block mb-1">Confirm Password*</label>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="****** confirm password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-10 right-4 flex items-center"
              >
                {showConfirmPassword ? <EyeOff size={20} color="#4db2b8" /> : <Eye size={20} color="#4db2b8" />}
              </button>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-2 mx-9">
              <button
                type="submit"
                className="w-full py-2 bg-l-blue text-white rounded-full hover:bg-lh-blue transform duration-500 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-l-blue underline">Login</Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
