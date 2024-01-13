import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }

      const user = await response.json();

      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error('Login failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      {loading && <Loader />}
      <div className='bg-white px-10 py-10 rounded-xl shadow-md'>
        <div className=''>
          <h1 className='text-center text-gray-800 text-2xl mb-4 font-bold'>Login</h1>
        </div>
        <div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='bg-gray-200 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-lg text-gray-800 placeholder:text-gray-500 outline-none'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-200 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-lg text-gray-800 placeholder:text-gray-500 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button onClick={login} className='bg-blue-500 w-full text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600'>
            Login
          </button>
        </div>
        <div>
          <h2 className='text-gray-800'>
            Don't have an account{' '}
            <Link className='text-blue-500 font-bold' to={'/signup'}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
