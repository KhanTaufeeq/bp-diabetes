import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  try { 
    // find email and username
    const existingUserEmail = await User.findOne({email})
    const existingUsername = await User.findOne({userName})

    if (existingUserEmail || existingUsername) {
      return res
        .status(400)
        .json({ message: `email or username already exists` });
    } else {
      // hash password
      // bcrypt performs a one-way hash operation, making the password unreadable.
      const hashedPassword = await bcrypt.hash(password, 10);

      // save user (temporary storage)
      const newUser = new User({ fullName, userName, email, password: hashedPassword, role:'user' });
      await newUser.save();

      res
        .status(200)
        .json({ message: "Congratulations! you are successfully registered" });
    }
  } catch (error) {
    console.error('Registration error: ', error.stack);
    res.status(500).json({ message: "something went wrong!" , error: error.message});
  }
};

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ userName });
    
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "username does not exist!" });
    }

    // verify password
    if (await bcrypt.compare(password, user.password)) {
      // create jwt
      const accessToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_ACCESS_SECRET,
        {expiresIn: '15m'}   // token expires in 15 minutes
      )
      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '2d'}
      )
      
      // store refresh token in the database
      user.refreshToken = refreshToken;
      await user.save();
      return res.json({ accessToken, refreshToken });
    }
    else {
      return res.status(401).json({message : 'Invalid credentials!'})
    }
  }
  catch (error) {
    console.error('Registration error: ', error.stack);
    res.status(500).json({ message: "something went wrong!" , error: error.message});
  }
}


export const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;

  if(!refreshToken) return res.status(401).json({error: "Token required!"})

  await User.updateOne({ refreshToken }, { $unset: { refreshToken: 1 } });

  res.json({ message: 'You are logged out successfully' });
}

export const createAdmin = async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email }) 
  const existingUserName = await User.findOne({ userName })
  
  if (existingUserEmail || existingUserName) {
    return res.status(401).json({error: "admin user already exists!"})
  } else {
    const hashedpassword = await bcrypt.hash(password, 10);
    const admin = new User({ fullName, userName, email, password: hashedpassword, role: 'admin' });
    await admin.save();
    res.status(200).json({ message: "Admin user has been created successfully!" });
  }
  } catch (error) {
    res.status(500).json({message: `something went wrong: ${error}`})
  }

}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       