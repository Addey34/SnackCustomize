import { Router } from 'express';
import {
  loginController,
  registerController,
  test,
} from '../controllers/authController.js';

const router: Router = Router();

// POST register new user
router.post('/register', registerController);

// POST login user
router.post('/login', loginController);

// GET test route
router.get('/test', test);

export default router;
