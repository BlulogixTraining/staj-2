const jwt = require('jsonwebtoken');

// JWT Middleware
const authMiddleware = {
    // Generate Token
    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            
            roles: user.roles,
            permissions: user.permissions
        };
        
        return jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: '24h'
        });
    },

    // Verify Token
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};

module.exports = { authMiddleware };