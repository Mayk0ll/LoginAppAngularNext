import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization']
    if(!headerToken && !headerToken?.startsWith('Bearer')) return res.status(401).json({data: 'Token invalid!'})

    try {
        jwt.verify(headerToken.slice(7), process.env.SECRET_KEY || 'other');
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({data: 'Token invalid!'})
    }
}