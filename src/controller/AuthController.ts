import  bcrypt  from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken'
interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponseBody {
  message: string;
  token?: string;
}

export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response<LoginResponseBody>,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }


      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ id: user.id, username: user.email }, "your-secret-key", {
        expiresIn: "1h", // Token expiration time
      });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error);
    }

//  asdf
};
