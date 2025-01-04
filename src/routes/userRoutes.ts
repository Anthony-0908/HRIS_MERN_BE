import { Router } from 'express';
import { getAllUsers, createUser, getOneUser, deleteUser, updateUser } from '../controller/UserController';

const router = Router();

// Route to get all users
router.get('/users', getAllUsers);

// Route to get a single user by ID
router.get('/user/:id', getOneUser);

// Route to create a new user
router.post('/userCreate', createUser);

// Route to update a user by ID
router.put('/userUpdate/:id', updateUser);

// Route to delete a user by ID
router.delete('/userDelete/:id', deleteUser);

export default router;
