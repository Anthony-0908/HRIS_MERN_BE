import { authenticate, AuthenticatedRequest, } from './../middleware/authmiddleware';
import express, {Response} from 'express';
import { login } from '../controller/AuthController' // Import the login function

const router = express.Router();

router.post('/userlogin', login); // Attach the login controller to the route



// Login
router.post("/login", login);

// Protected Route
router.get("/protected", authenticate, (req:AuthenticatedRequest, res:Response) => {
  res.json({ message: "You have access", user: req.user });
});

export default router;
