import { AppDataSource } from './../data-source';
import bcrypt from 'bcryptjs';
import { User } from "../entity/User";

import { Request, Response } from "express";


async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
export const getAllUsers = async(req:Request ,res:Response) => {
    const userRepository =  AppDataSource.getRepository(User)

    try {
        const users = await userRepository.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:'Error retrieving users' ,error})
    }
}


export const getOneUser = async(req:Request, res:Response): Promise<void> =>  
{
  const {id} = req.params
  const userRepository = AppDataSource.getRepository(User)
  
  try {
    const user = await userRepository.findOneBy({id:parseInt(id)})

    if(!user) { 
      res.status(404).json({messge:'User not found'})
      return
    }
    else {
      res.status(200).json(user)
      return 
    }
  } catch (error) {
    res.status(500).json({message:'Error retrieving users' ,error})
  }
}



// Controller to create a user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  try {
      if (req.body.password) { // Only hash if a password is provided
          const saltRounds = 10; // Cost factor for bcrypt
          user.password = await bcrypt.hash(req.body.password, saltRounds);
      } else {
        res.status(400).json({message: "Password is required"})
        return 
      }

      const savedUser = await userRepository.save(user);
      res.status(201).json(savedUser);
  } catch (error: unknown) {
      console.error("Error creating user:", error);
      let errorMessage = 'Error creating user';
      if (error instanceof Error) {
          errorMessage = error.message;
      }
      res.status(500).json({ message: errorMessage, error });
  }
};
  

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  
  try {
      // Check if user exists by finding the user based on the given id
      const userToDelete = await userRepository.findOneBy({ id: parseInt(id, 10) });

      // If no user is found, return 404
      if (!userToDelete) {
        res.status(404).json({ message: 'User not found' });
        return 
      }

      // If user is found, remove the user
      await userRepository.remove(userToDelete);

      // Return success response
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      // Log the error for debugging
      console.error('Error deleting user:', error);

      // Return 500 status for server errors
      res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const updateUser = async (req: Request, res: Response):Promise<void> => {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);

    try {
        const userToUpdate = await userRepository.findOneBy({ id: parseInt(id) });

        if (!userToUpdate) {
          res.status(404).json({ message: 'User not found' });
            return 
        }

        if (req.body.name) {
            userToUpdate.name = req.body.name;
        }
        if (req.body.email) {
            userToUpdate.email = req.body.email;
        }
        if (req.body.password) {
            const saltRounds = 10;
            userToUpdate.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        const updatedUser = await userRepository.save(userToUpdate);
        res.status(200).json(updatedUser);

    } catch (error: unknown) {
        console.error("Error updating user:", error);
        let errorMessage = 'Error updating user';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({ message: errorMessage, error });
    }
};
