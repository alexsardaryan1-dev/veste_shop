import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-6'>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto lg:bg-white lg:border lg:border-gray-300 lg:shadow-sm lg:p-10 xl:p-12 2xl:p-14 lg:rounded-xl'>

        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-[.25em] mb-3'>
            VESTE
          </h1>
          <p className='text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl tracking-wider uppercase'>
            Reset Your Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 p-4 md:p-5 xl:p-6 rounded-xl mb-6 text-sm md:text-base xl:text-lg'>
            <p className='font-medium mb-2'>Reset code sent!</p>
            <p className='text-xs sm:text-sm md:text-base xl:text-lg'>
              Check backend console for reset code
            </p>
            <button
              onClick={() => navigate('/reset-password', { state: { email } })}
              className='text-green-700 font-medium hover:underline mt-2'
            >
              Enter reset code
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 md:p-4 xl:p-5 rounded-xl mb-6 text-xs sm:text-sm md:text-base xl:text-lg'>
            {error}
          </div>
        )}

        {/* FORM */}
        {!success && (
          <form onSubmit={handleForgot} className='flex flex-col gap-5'>

            <p className='text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-gray-600 mb-2'>
              Enter your email address and we'll send you a reset code
            </p>

            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wider font-light'
              >
                Email
              </label>

              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='your@email.com'
                className='border border-gray-300 rounded-xl p-3 md:p-4 xl:p-5 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl outline-none focus:border-black transition'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-black rounded-xl text-white p-3 md:p-4 xl:p-5 uppercase tracking-wider text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl font-light disabled:opacity-50 border border-black hover:bg-white hover:text-black transition-colors duration-300'
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>

          </form>
        )}

        {/* DIVIDER */}
        <div className='w-full h-px bg-gray-300 my-5' />

        {/* LOGIN LINK */}
        <div className='text-center'>
          <p className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl text-gray-500'>
            Remember your password?{' '}
            <Link to='/login' className='text-black font-medium hover:underline'>
              Log in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;