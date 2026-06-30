import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white p-6'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>You must be logged in</p>
          <button 
            onClick={() => navigate('/login')}
            className='text-[#313131] font-medium hover:underline'
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      });
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-6'>
      <div className='w-full max-w-md'>

        {/* HEADER */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-light tracking-[.25em] mb-3'>VESTE</h1>
          <p className='text-gray-600 text-xs tracking-wider uppercase'>Change Your Password</p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 p-4 rounded mb-6 text-sm'>
            <p className='font-medium'>Password changed successfully!</p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs'>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleChangePassword} className='flex flex-col gap-5'>

          {/* CURRENT PASSWORD */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='currentPassword' className='text-xs uppercase tracking-wider font-light'>
              Current Password
            </label>
            <input
              id='currentPassword'
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder='••••••••'
              className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition'
              required
            />
          </div>

          {/* NEW PASSWORD */}
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

          {/* CONFIRM PASSWORD */}
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

          {/* SUBMIT BUTTON */}
          <button
            type='submit'
            disabled={loading}
            className='bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light hover:bg-[#1a1a1a] disabled:opacity-50 transition'
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>

        </form>

        {/* DIVIDER */}
        <div className='w-full h-px bg-[#D0D0D0] my-5' />

        {/* BACK LINK */}
        <div className='text-center'>
          <button 
            onClick={() => navigate('/')}
            className='text-[#313131] text-xs font-medium hover:underline'
          >
            Back to home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;