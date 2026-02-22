import jwt from "jsonwebtoken";

export const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decipherToken = await jwt.verify(token, process.env.JWT_KEY);
        req.user.id = decipherToken.id;
        res.status(200).json({
            message: "Token valid", token }
        );
        
        return next();
    }
    catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};