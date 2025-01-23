import express from 'express';
import { login } from '../controller/AuthController' // Import the login function

const router = express.Router();

router.post('/userlogin', login); // Attach the login controller to the route

export default router;
