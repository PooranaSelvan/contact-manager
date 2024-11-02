import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault();
     setError('');
     setIsLoading(true);
     const apiUrl = import.meta.env.VITE_API_URL;
     try {
       const response = await axios.post(`${apiUrl}register/`, { email, password });
       if (response.status === 201) {
         navigate('/');
       } else {
         setError('Registration failed. Please try again.');
       }
     } catch (error) {
       if (error.response && error.response.data) {
         setError(error.response.data.message || 'Registration failed. Please try again.');
       } else {
         setError('An error occurred. Please try again.');
       }
       console.error('Registration error:', error);
     } finally {
       setIsLoading(false);
     }
   };


  return (
    <div className="relative min-h-screen flex flex-wrap flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 gap-10">
      <Helmet>
        <link rel="icon" href="/login.svg" />
        <title>Register Page</title>
      </Helmet>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete='username'className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password'placeholder="Password" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <Link to='/' className="text-blue-500 hover:underline">Sign in</Link>
        </div>
      </div>
      <div className="flex absolute bottom-0 flex-wrap items-center justify-center text-center gap-6 text-white bg-gray-600 w-full py-5">
        <p>If you already have an account <a className='font-bold underline' target='_blank' href="https://stud-management.vercel.app/">here</a>, please do not register. You can log in directly without creating a new account.</p>
      </div>
    </div>
  );
};

export default RegisterPage;