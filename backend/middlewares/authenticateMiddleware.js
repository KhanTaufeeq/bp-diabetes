import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.replace("Bearer ", "");

  if (!accessToken)
    return res
      .status(401)
      .json({ error: "No Access token, Authentication denied!" });

  const user = await User.findOne({ accessToken });
  if (!user)
    return res
      .status(401)
      .json({ error: "User with this token does not exist" });

  // verify access token
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    const userId = decoded.userId;

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
