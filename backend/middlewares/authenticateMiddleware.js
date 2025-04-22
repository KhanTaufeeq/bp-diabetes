import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ error: "Refresh token required!" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: "Invalid refresh token" })
    
    // verify refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({err: "Invalid token"})
    })
    
    // generate new access token
    const newAccessToken = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '15m'}
    )

    req.user = user;

    res.json({ accessToken: newAccessToken });

    next();
}
