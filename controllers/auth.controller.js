import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from 'uuid';


const transporter = nodemailer.createTransport({
  // Configure your email provider here
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password for Gmail
  },
});

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        otp, // Save OTP to the database
      },
    });

    // SEND OTP TO USER VIA EMAIL
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'OTP for Email Verification',
      text: ` Welcome to Hrajstate please verify your email.
      Your OTP for email verification for hrajestste is: ${otp}
      valid for 10 minutes .`,
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        otp, // Match OTP
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user to mark as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otp: null, // Clear OTP after verification
      },
    });

     // SEND OTP TO USER VIA EMAIL
     await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'OTP for password change',
      text: ` Welcome to Hrajstate 
      Your OTP for password change for hrajestste is: ${otp}
      valid for 10 minutes .`,
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};


// this is for forgot password 


// export const sendOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         email,
//         otp, // Match OTP
//       },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Update user to mark as verified
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         isVerified: true,
//         otp: null, // Clear OTP after verification
//       },
//     });

//     res.status(200).json({ message: "Otp send successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// // this is for reset password
// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     // Check OTP validity
//     const otpEntry = await Otp.findUnique({ where: { email, otp } });
//     if (!otpEntry) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // Check OTP expiry (e.g., valid for 10 minutes)
//     const currentTime = new Date();
//     const otpTime = new Date(otpEntry.createdAt);
//     if ((currentTime - otpTime) > 10 * 60 * 1000) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password
//     await User.update({
//       where: { email },
//       data: { password: hashedPassword },
//     });

//     // Remove OTP entry from database
//     await Otp.delete({ where: { email, otp } });

//     res.json({ message: 'Password reset successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// };



export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};



