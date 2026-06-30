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
      <div className='w-full'>

        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-light tracking-[.25em] mb-3'>VESTE</h1>
          <p className='text-gray-600 text-xs tracking-wider uppercase'>Reset Your Password</p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-6 text-sm'>
            <p className='font-medium mb-2'>Reset code sent!</p>
            <p className='text-xs'>Check backend console for reset code</p>
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
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs'>
            {error}
          </div>
        )}

        {/* FORM */}
        {!success && (
          <form onSubmit={handleForgot} className='flex flex-col gap-5'>

            <p className='text-sm text-gray-600 mb-2'>
              Enter your email address and we'll send you a reset code
            </p>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-xs uppercase tracking-wider font-light'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='your@email.com'
                className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light hover:bg-[#1a1a1a] disabled:opacity-50 transition'
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>

          </form>
        )}

        {/* DIVIDER */}
        <div className='w-full h-px bg-[#D0D0D0] my-5' />

        {/* LOGIN LINK */}
        <div className='text-center'>
          <p className='text-xs text-gray-600'>
            Remember your password?{' '}
            <Link to='/login' className='text-[#313131] font-medium hover:underline'>
              Log in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;