import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticationToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token provided" })
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
        if (error) {
            res.status(403).json({ message: "Invalid or expired token" });
            return;
        }
        (req as any).user = user;
        next();
    })
} 