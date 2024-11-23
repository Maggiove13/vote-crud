const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const { rateLimit }  = require("express-rate-limit");

dotenv.config()

exports.authorization = async (req, res, next) => {
    const token = req.cookies.authToken;
    const sessionId = req.cookies.session_id;
    const publicPaths = ["/api/login", "/api/register", "/api/series", "/api/logout"];

    if (publicPaths.includes(req.path)) {
        return next();
    }

    try {
        if (!token && !sessionId) {
            return res.status(401).json({ message: "No token or sessionId found" });
        }

        if (token) {
            const JWT_SECRET = process.env.JWT_SECRET;
            const tokenDecoded = jwt.verify(token, JWT_SECRET);

            if (!tokenDecoded || !tokenDecoded.id) {
                return res.status(401).json({ message: "Invalid token payload" });
            }

            req.user = {
                id: tokenDecoded.id,
                role: tokenDecoded.role,
                email: tokenDecoded.email
            };
            
        } 

        else if (req.session && req.session.user) {
            req.user = {
                id: req.session.user.id,
                role: req.session.user.role,
                email: req.session.user.email
            };
        }


        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "User information not found" });
        }

        res.locals.user = req.user;

        next();
    } catch (error) {
        console.error("Error in authorization:", error);
        return res.status(401).json({ message: "Authorization error" });
    }
};

