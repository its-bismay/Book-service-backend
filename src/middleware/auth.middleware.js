import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config.js";

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({
            message: "No authentication token, access denied",
            success: false,
          });
        }
        const token = authHeader.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json ({
                message: "Invalid token, access denied",
                success: false
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("something went wrong", error)
        res.status(500).json ({
            message: "Internal server error",
            success: false
        })
    }
}

export default protectRoute;