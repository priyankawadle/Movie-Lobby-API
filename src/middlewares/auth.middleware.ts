import { Request, Response, NextFunction } from 'express';

export function adminOnly(req: Request, res: Response, next: NextFunction): void {
  // In a real application, you'd verify the user's token or session here.
  // For simplicity, let's assume a header `x-role` = 'admin' is enough.
  const userRole = req.headers['x-role'];
  if (userRole === 'admin') {
    return next();
  }
   res.status(403).json({ error: 'Admin access only' });
}
