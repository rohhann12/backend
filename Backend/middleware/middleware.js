const jwt = require('jsonwebtoken');
const { User } = require('../db/db');

const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'internship'); 
    } catch (error) {
        console.error('Token Verification Error:', error.message); // Log the error message here
        return null;
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const tokenWithBearer = req.headers.authorization;
        console.log('Token with Bearer:', tokenWithBearer); // Log the token here
        if (!tokenWithBearer) {
            throw new Error('Authentication token not provided');
        }

        const token = tokenWithBearer.startsWith('Bearer ') ? tokenWithBearer.slice(7) : tokenWithBearer;
        const decodedToken = verifyToken(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token here
        if (!decodedToken) {
            throw new Error('Invalid token');
        }

        if (!decodedToken.userId) {
            throw new Error('Invalid userId in decoded token');
        }

        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication failed:', error.message);
        res.status(401).json({ msg: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;
