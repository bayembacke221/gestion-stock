import { Response, NextFunction } from 'express';
import AuthService from '../utils/jwt.utils';
import { AuthRequest } from '../utils/type';


const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const headerAuth = req.headers['authorization'];

        if (!headerAuth) {
            return res.status(401).json({ error: true, message: "Utilisateur non authentifié" });
        }

        const userId = AuthService.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(401).json({ error: true, message: "Utilisateur non authentifié" });
        }
        req.userId = userId;
        next();
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export default authMiddleware;