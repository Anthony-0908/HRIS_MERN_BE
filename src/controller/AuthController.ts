import { Request, Response, NextFunction } from 'express';

interface LoginRequestBody {
  username: string;
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
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      res.json({ message: 'Login successful', token: 'mock-jwt-token' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};
