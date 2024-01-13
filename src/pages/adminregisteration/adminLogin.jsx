import { useContext, useState } from 'react';
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
        // Handle non-OK responses (e.g., invalid credentials)
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

      // Save user information to local storage or context if needed
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the desired page after successful login
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
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className='bg-gray-800 px-10 py-10 rounded-xl'>
        <div className=''>
          <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
        </div>
        <div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
            placeholder='Password'
          />
        </div>
        <div className='flex justify-center mb-3'>
          <button onClick={login} className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
            Login
          </button>
        </div>
        <div>
          <h2 className='text-white'>
            Don't have an account{' '}
            <Link className='text-yellow-500 font-bold' to={'/signup'}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
