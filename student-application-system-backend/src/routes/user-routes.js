import { Router } from 'express';
import {
  getUserDetails,
  sendEmailVerification,
  updateUserDetails,
  verifyGmailToken,
} from '../controllers/user-controller.js';
import { isUserAuthenticated } from '../middlewares/auth-middleware.js';

const router = Router();

router.route('/update-details').put(isUserAuthenticated, updateUserDetails);
router.route('/user-details').get(getUserDetails);
router
  .route('/sendemailverification')
  .post(isUserAuthenticated, sendEmailVerification);
router
  .route('/verify-user-gmail-token')
  .post(isUserAuthenticated, verifyGmailToken);
export default router;
