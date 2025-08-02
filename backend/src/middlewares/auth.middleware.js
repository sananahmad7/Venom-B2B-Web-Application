import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Here in the middleware");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not Authorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_Secret);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Not Authorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("WHOLE MIDDLE");
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
