import jwt from "jsonwebtoken";
import "dotenv/config"

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                sucess: false,
                message: "Access denied. No token provided."
            })
        }
        try {
            const token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next()
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: "internal server error"
        })
    }
}