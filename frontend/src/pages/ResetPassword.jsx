import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!email) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white p-6'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>No email found. Use forgot password link.</p>
          <Link to='/forgot-password' className='text-[#313131] font-medium hover:underline'>
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/auth/reset-password', {
        email,
        resetCode,
        newPassword
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
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
          <p className='text-gray-600 text-xs tracking-wider uppercase'>Enter New Password</p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-6 text-sm'>
            <p className='font-medium mb-2'>Password reset successfully!</p>
            <button
              onClick={() => navigate('/login')}
              className='text-green-700 font-medium hover:underline mt-2'
            >
              Go to login
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs'>
            {error}
          </div>
        )}

        {/* INFO */}
        <div className='bg-blue-50 border border-blue-200 p-4 rounded mb-6 text-sm text-blue-900'>
          <p className='font-medium mb-1'>For Testing:</p>
          <p className='text-xs'>Check backend console for reset code</p>
        </div>

        {/* FORM */}
        {!success && (
          <form onSubmit={handleReset} className='flex flex-col gap-5'>

            <div className='flex flex-col gap-2'>
              <label htmlFor='code' className='text-xs uppercase tracking-wider font-light'>
                Reset Code
              </label>
              <input
                id='code'
                type='text'
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                placeholder='ABC123'
                maxLength='6'
                className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition text-center text-lg tracking-widest'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='newPassword' className='text-xs uppercase tracking-wider font-light'>
                New Password
              </label>
              <input
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='••••••••'
                className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition'
                required
              />
              <p className='text-xs text-gray-500'>Min 6 chars, 1 uppercase, 1 number</p>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='confirmPassword' className='text-xs uppercase tracking-wider font-light'>
                Confirm Password
              </label>
              <input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='••••••••'
                className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light hover:bg-[#1a1a1a] disabled:opacity-50 transition'
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

          </form>
        )}

        {/* DIVIDER */}
        <div className='w-full h-px bg-[#D0D0D0] my-5' />

        {/* BACK LINK */}
        <div className='text-center'>
          <Link to='/login' className='text-[#313131] text-xs font-medium hover:underline'>
            Back to login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;