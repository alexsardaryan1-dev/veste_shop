import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const Settings = () => {
  const { user } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/auth/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-8 max-w-lg'>
      <h1 className='text-2xl font-light'>Settings</h1>

      {/* ACCOUNT INFO */}
      <div className='rounded-xl border border-gray-500 p-6 space-y-3'>
        <h2 className='text-lg font-light mb-2'>Account Info</h2>
        <div>
          <p className='text-xs uppercase tracking-wider text-gray-500'>Name</p>
          <p className='text-sm'>{user?.name}</p>
        </div>
        <div>
          <p className='text-xs uppercase tracking-wider text-gray-500'>Email</p>
          <p className='text-sm'>{user?.email}</p>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className='rounded-xl border border-gray-500 p-6'>
        <h2 className='text-lg font-light mb-4'>Change Password</h2>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-xs'>
            {error}
          </div>
        )}
        {success && (
          <div className='bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4 text-xs'>
            {success}
          </div>
        )}

        <form onSubmit={handleChangePassword} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='text-xs uppercase tracking-wider font-light'>
              Current Password
            </label>
            <input
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition rounded'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs uppercase tracking-wider font-light'>
              New Password
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition rounded'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs uppercase tracking-wider font-light'>
              Confirm New Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition rounded'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 rounded'
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;