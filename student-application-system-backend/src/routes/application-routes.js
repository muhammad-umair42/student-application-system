import { Router } from 'express';
import {
  createApplication,
  getAllPendingApplications,
  getApplication,
  getApplications,
  getUserApplication,
  updateApplicationStatus,
  updateDraftApplication,
} from '../controllers/application-controller.js';
import { isUserAuthenticated } from '../middlewares/auth-middleware.js';
const router = Router();

// Application routes
//creating a new application
router
  .route('/create-application')
  .post(isUserAuthenticated, createApplication);

//getting all applications based on status passed for a single user in request
router.route('/list/:status').post(isUserAuthenticated, getApplications);
//getting a single application based on application id
router.route('/get-application/').post(isUserAuthenticated, getApplication);
//getting a single application based on user id by an admin
router
  .route('/get-userapplication/:id')
  .post(isUserAuthenticated, getUserApplication);
//updating a draft application
router.route('/update-draft').post(isUserAuthenticated, updateDraftApplication);
//updating application status
router
  .route('/update-application-status/:id')
  .post(isUserAuthenticated, updateApplicationStatus);
//getting all pending applications by an admin
router
  .route('/get-all-pendings/:id')
  .get(isUserAuthenticated, getAllPendingApplications);
export default router;
