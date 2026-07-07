import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/login', { email, password });
      setUser(res.data.user);
      console.log('Login success:', res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.log('Login error:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-6'>
      <div className='w-full lg:max-w-md lg:mx-auto lg:bg-white lg:border lg:border-gray-300 rounded-xl lg:shadow-sm lg:p-8'>
        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-light tracking-[.25em] mb-3 lg:text-4xl'>VESTE</h1>
          <p className='text-gray-600 text-xs tracking-wider uppercase lg:text-lg'>
            Log In to Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-6 text-xs'>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className='flex flex-col gap-5'>
          {/* EMAIL */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='email'
              className='text-xs uppercase tracking-wider font-light lg:text-base'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your@email.com'
              className='border border-gray-300 rounded-xl p-3 text-sm outline-none focus:border-gray-300 transition lg:text-base'
              required
            />
          </div>

          {/* PASSWORD */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='password'
              className='text-xs uppercase tracking-wider font-light lg:text-base'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='border border-gray-300 p-3 text-sm outline-none focus:border-gray-300 transition rounded-xl lg:text-base'
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type='submit'
            disabled={loading}
            className='bg-black text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition lg:text-base transition-colors duration-300 rounded-xl '
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className='text-center my-3'>
          <Link
            to='/forgot-password'
            className='text-gray-500 text-xs font-medium hover:underline lg:text-base'
          >
            Forgot password?
          </Link>
        </div>

        {/* DIVIDER */}
        <div className='w-full h-px bg-gray-300 my-5' />

        {/* REGISTER LINK */}
        <div className='text-center'>
          <p className='text-xs text-gray-500 lg:text-base'>
            Don't have an account?{' '}
            <Link
              to='/register'
              className='text-black font-medium hover:underline'
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
