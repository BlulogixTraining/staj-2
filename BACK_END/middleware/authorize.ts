import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    role: string;
}

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).json({ message: 'No token provided' });
            return;  // Return to avoid further execution
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

            // Check if the user has the required role
            if (decoded.role && roles.includes(decoded.role)) {
                return next();  // Continue to the next handler
            } else {
                res.status(403).json({ message: 'You do not have permission to perform this action' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};
