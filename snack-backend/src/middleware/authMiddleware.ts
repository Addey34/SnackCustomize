import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: 'admin' | 'client';
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization header:', authHeader);
  const token = authHeader?.split(' ')[1];
  console.log('Token extracted:', token);
  if (!token) return res.status(401).json({ msg: 'No token' });
  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ msg: 'JWT_SECRET not defined' });

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    console.log('Decoded token:', decoded);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error('Token error:', err);
    return res.status(403).json({ msg: 'Invalid token', error: err });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as JwtPayload;
  if (user.role !== 'admin') return res.status(403).json({ msg: 'Not admin' });
  next();
};
