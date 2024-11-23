import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Request, Response } from 'express';

const router = Router();

// Endpoint to get all users
router.get('/users', async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
});

// Endpoint to create a user
router.post('/users', async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  try {
    const savedUser = await userRepository.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

export default router;