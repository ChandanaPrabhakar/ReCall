import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();

    if (!fullname) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    //SignUp API Call

    try {
      const response = await axiosInstance.post('/signup', {
        fullName: fullname,
        email: email,
        password: password,
      })

      if (response.data?.error) {
        setError(response.data.message);
        return;
      }

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
          <form onSubmit={handleSignup} >
            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input
              type='text'
              placeholder='Jane Doe'
              className='input-box'
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

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

            <button type='submit' className='btn-primary cursor-pointer' >Create Account</button>
            <p className='text-sm mt-4 text-center'>
              Already have an Account? {""} <Link to="/login" className="font-medium text-primary underline">Login</Link></p>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
