import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/api.error.js";
import sendResponse from "../utils/response.helper.js";
import generateToken from "../utils/token.util.js";

const register = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
   }

   const existingUser = await User.findOne({ email });

   if (existingUser) {
      throw new ApiError(409, "User already exists");
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
      name,
      email,
      password: hashedPassword,
   });

   const token = generateToken(user);

   return sendResponse(res, 201, "User registered successfully", {
      token,
      user: {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      },
   });
});

const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new ApiError(400, "All fields are required");
   }

   const user = await User.findOne({ email }).select("+password");

   if (!user) {
      throw new ApiError(401, "Invalid credentials");
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
   }

   const token = generateToken(user);

   return sendResponse(res, 200, "User logged in successfully", {
      token,
      user: {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      },
   });
});

export { register, login };
