import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import nodemailer from "nodemailer";
import UserToken from "../models/UserToken.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "User created successfully!"));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );
    const { roles } = user;
    if (!user) return next(CreateError(404, "Invalid credentials!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(CreateError(400, "Invalid credentials!"));
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ status: 200, message: "Login successful!", data: user });
  } catch (error) {
    return next(CreateError(500, "Internal server error!"));
  }
};

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: true,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "Admin created successfully!"));
};

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });

  if (!user) return next(CreateError(404, "User not found!"));
  const payload = {
    email: user.email,
  };

  const expiryTime = 600;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  let mailDetails = {
    from: process.env.AUTH_USER,
    to: email,
    subject: "Password Reset",
    html: `
        <html>
            <head>
                <title>Anfrage zur Passwortzurücksetzung</title>
            </head>
            <body>
                <h1>Anfrage zur Passwortzurücksetzung</h1>
                <p>Hallo ${user.firstName} ${user.lastName},</p>
                <h3>Bitte klicken Sie auf den unten stehenden Link, um Ihr Passwort zurückzusetzen</h3>
                <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px; 20px; border: none; cursor: pointer; border-radius: 4px;">Passwort Zurücksetzen</button></a>
                <p>Vielen Dank</p>
                <p>Tobias Aschenbrenner</p>
            </body>
        </html>
    `,
  };

  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(CreateError(500, "Internal server error!"));
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Email sent successfully!"));
    }
  });
};

export const resetPassword = async (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) return next(CreateError(400, "Invalid token!"));
    const response = data;
    const user = await User.findOne({
      email: { $regex: "^" + response.email + "$", $options: "i" },
    });
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);
    user.password = encryptedPassword;
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      return next(CreateSuccess(200, "Password updated successfully!"));
    } catch (error) {
      return next(CreateError(500, "Internal server error!"));
    }
  });
};
