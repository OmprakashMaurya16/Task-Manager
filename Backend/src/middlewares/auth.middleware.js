import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/api.error.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized");
   }

   const token = authHeader.split(" ")[1];

   let decoded;

   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (error) {
      throw new ApiError(401, "Invalid token");
   }

   req.user = {
      userId: decoded.userId,
      role: decoded.role,
   };
   next();
});

export default authMiddleware;
