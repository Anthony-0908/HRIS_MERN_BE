import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Request, Response } from 'express';
import { getAllUsers,createUser } from '../controller/UserController';

const router = Router();
// Route to get all users
router.get('/users', getAllUsers);

// Route to create a user
router.post('/users', createUser);

export default router;
