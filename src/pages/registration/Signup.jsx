import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);

    if (name === '' || email === '' || password === '') {
      return toast.error('All fields are required');
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      toast.success('Signup Successfully');
      setName('');
      setEmail('');
      setPassword('');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      {loading && <Loader />}
      <div className='bg-white px-8 py-8 rounded-lg shadow-md w-full max-w-md'>
        <div className='text-center mb-4'>
          <h1 className='text-2xl text-gray-800 font-bold'>Signup</h1>
        </div>
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            name='name'
            className='bg-gray-200 mb-4 px-3 py-2 w-full rounded-md text-gray-800 placeholder:text-gray-500 outline-none'
            placeholder='Name'
            autoComplete='off'
          />
        </div>
        <div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='bg-gray-200 mb-4 px-3 py-2 w-full rounded-md text-gray-800 placeholder:text-gray-500 outline-none'
            placeholder='Email'
            autoComplete='off'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-200 mb-4 px-3 py-2 w-full rounded-md text-gray-800 placeholder:text-gray-500 outline-none'
            placeholder='Password'
            autoComplete='off'
          />
        </div>
        <div className='flex justify-center mt-6'>
          <button onClick={signup} className='bg-green-500 w-full text-white font-bold px-4 py-2 rounded-md hover:bg-green-600'>
            Signup
          </button>
        </div>
        <div className='text-center mt-4'>
          <h2 className='text-gray-800'>
            Have an account?{' '}
            <Link className='text-blue-500 font-bold' to={'/login'}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
