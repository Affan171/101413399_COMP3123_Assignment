const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Authorization: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateToken;
