import express from 'express';
import { 
    register, 
    verifyCode, 
    login, 
    forgotPassword,
    resetPassword,
    changePassword,
    getMe, 
    logout 
} from '../controllers/authController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-code', verifyCode);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', protect, changePassword);
router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;