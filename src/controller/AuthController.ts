import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';

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

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    console.log('Password to compare:', password);
    console.log('Stored hash:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "your-secret-key", {
      expiresIn: "1h", // Token expiration time
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};






// // Example without bcrypt: direct comparison (plain text comparison)
// export const login = async (
//   req: Request<{}, {}, LoginRequestBody>,
//   res: Response<LoginResponseBody>,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     const userRepository = AppDataSource.getRepository(User);

//     const user = await userRepository.findOne({ where: { email } });
//     if (!user) {
//       res.status(401).json({ message: "Invalid credentials" });
//       return;
//     }

//     // Directly compare plain text password (not secure, for testing only)
//     if (password !== user.password) {
//       res.status(401).json({ message: "Invalid credentials" });
//       return;
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, "your-secret-key", {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     next(error);
//   }
// };
