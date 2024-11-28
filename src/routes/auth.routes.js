// src/routes/auth.routes.js
import express from 'express';
import { auth, checkRole } from '../middleware/auth';
import { validateRegistration, validateLogin } from '../middleware/validation';
import * as authController from '../controllers/authController';

const router = express.Router();

// Public authentication routes
router.post('/register', validateRegistration, authController.register);

router.post('/login', validateLogin, authController.login);

router.post('/logout', auth, authController.logout);

// Admin only routes
router.post('/register-artist', auth, checkRole(['ADMIN']), validateRegistration, authController.registerArtist);

router.post('/register-director', auth, checkRole(['ADMIN']), validateRegistration, authController.registerDirector);

// Token management
router.post('/refresh-token', authController.refreshToken);

// Password management (Missing routes)
router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);

router.put('/change-password', auth, authController.changePassword);

// Profile management
router.get('/profile', auth, authController.getProfile);

router.put('/profile', auth, authController.updateProfile);

// Role verification (Missing route)
router.get('/verify-role', auth, authController.verifyRole);

export default router;