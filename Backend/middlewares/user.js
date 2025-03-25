const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

function userMiddleware(req, res, next) {
    //format of authHeader = Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I
    //---------------------- Header---------Scheme--Actual JWT Token--------------
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Invalid token format"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    userMiddleware
};
