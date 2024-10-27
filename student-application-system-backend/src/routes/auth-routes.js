import { Router } from 'express';
import {
  generatingAuthUrl,
  logout,
  OAuthCallback,
} from '../controllers/auth-controller.js';
const router = Router();

// Defining the routes for the auth
//generating auth url route which redirects to the callback route
router.route('/microsoft').get(generatingAuthUrl);
router.route('/azure/callback').get(OAuthCallback);
//logout route
router.route('/logout').get(logout);
export default router;
