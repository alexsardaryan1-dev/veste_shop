import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white p-6'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>No email found. Please register first.</p>
          <button 
            onClick={() => navigate('/register')}
            className='text-[#313131] font-medium hover:underline'
          >
            Go to Register
          </button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/api/auth/verify-code', { 
        email, 
        verificationCode: code 
      });
      console.log('Verified:', res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
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
          <p className='text-gray-600 text-xs tracking-wider uppercase'>Verify Your Email</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs'>
            {error}
          </div>
        )}

        {/* INFO */}
        <div className='bg-blue-50 border border-blue-200 p-4 rounded mb-6 text-sm text-blue-900'>
          <p className='font-medium mb-1'>For Testing:</p>
          <p className='text-xs'>Check your backend console. You'll see: <strong>Verification code for {email}: XXXXXX</strong></p>
          <p className='text-xs mt-2'>In production, this code would be sent to your email.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className='flex flex-col gap-5'>

          <div className='flex flex-col gap-2'>
            <label htmlFor='code' className='text-xs uppercase tracking-wider font-light'>
              Verification Code
            </label>
            <input
              id='code'
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder='ABC123'
              maxLength='6'
              className='border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition text-center text-lg tracking-widest'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition'
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

        </form>

        {/* DIVIDER */}
        <div className='w-full h-px bg-[#D0D0D0] my-5' />

        {/* BACK LINK */}
        <div className='text-center'>
          <p className='text-xs text-gray-600'>
            <button 
              onClick={() => navigate('/register')}
              className='text-[#313131] font-medium hover:underline'
            >
              Back to register
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default VerifyCode;