import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter password');
      return;
    }

    setError("")

    //Login API Call

    try {
      const response = await axiosInstance.post('/login', {
        email: email,
        password: password,
      })

      if (response.data?.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }

    } catch (error) {
      setError(
        error.response?.data?.message ?? "An unexpected error occurred. Please try again later."
      );
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 rounded border border-primary bg-white px-7 py-10'>
          <form onSubmit={handleLogin} >
            <h4 className='text-2xl mb-7'>Login</h4>
            <input
              type='text'
              placeholder='john@example.com'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary cursor-pointer' >Login</button>
            <p className='text-sm mt-4 text-center'>
              Not registered yet? {""} <Link to="/signup" className="font-medium text-primary underline">Create an Account</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
