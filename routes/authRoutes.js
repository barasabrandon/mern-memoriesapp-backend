import express from 'express';

import { createUser, signInUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/createUser', createUser);
router.post('/signInUser', signInUser);

export default router;
