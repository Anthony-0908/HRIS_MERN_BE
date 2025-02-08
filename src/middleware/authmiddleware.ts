import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";




export interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string }; // Define the `user` property
}

// Middleware
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as { id: string; username: string };
    req.user = decoded; // Safe access to `user`
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }

}


// Route
export const getUserProfile = (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.json({ message: "Profile data", user: req.user });
};

