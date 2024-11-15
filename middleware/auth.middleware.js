import jwt from 'jsonwebtoken'
import { getUserByIdService } from '../services/user.service.js';

export const userMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenType = req.headers.authorization?.split(' ')[0];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (tokenType === 'Bearer') {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            
            const userId = decoded.userId;
            
            const user = await getUserByIdService(userId);
    
            if (user.role != 'user') {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            req.user = user;
            
            next();
            
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



export const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenType = req.headers.authorization?.split(' ')[0];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (tokenType === 'Bearer') {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            
            const userId = decoded.userId;
            
            const user = await getUserByIdService(userId);
    
            if (user.role != 'admin') {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            req.user = user;
            next();
            
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}