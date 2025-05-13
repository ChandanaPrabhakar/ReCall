import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
        if(error) return res.status(403);
        req.user = user;
        next();
    })
} 