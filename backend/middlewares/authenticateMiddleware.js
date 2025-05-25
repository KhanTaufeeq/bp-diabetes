// import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  console.log('=== AUTH MIDDLEWARE DEBUG ===');
  console.log('Headers:', req.headers);
  const accessToken = req.headers.authorization?.replace("Bearer ", "");
  console.log('Extracted Token', accessToken);
  console.log('Token type:', typeof accessToken);


  // check for null, undefined or empty string
  if (!accessToken || accessToken === '') {
    console.log('ERROR: No token found');
    return res
      .status(401)
      .json({ error: "No Access token, Authentication denied!" });
  }

  // verify access token
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    console.log("Decoded token payload:", decoded);

    const userId = decoded.userId;
    console.log('Extracted user id:', userId);

    req.userId = userId;
    console.log('Set req.userId:', req.userId);
    console.log('============================');

    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
