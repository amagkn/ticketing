import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jwt: token } = req.session ?? {};

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    req.currentUser = payload;
  } catch (err) {}

  next();
};
