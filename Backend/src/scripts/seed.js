import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from "../models/user.model.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedUsers = async () => {
   try {
      await connectDB();

      // Clear existing users
      await User.deleteMany();

      const hashedPassword = await bcrypt.hash("password123", 10);

      const users = await User.insertMany([
         {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
         },
         {
            name: "Member One",
            email: "member1@example.com",
            password: hashedPassword,
            role: "member",
         },
         {
            name: "Member Two",
            email: "member2@example.com",
            password: hashedPassword,
            role: "member",
         },
      ]);

      console.log("Seeded Users:");
      users.forEach((user) => {
         console.log(
            `Email: ${user.email} | Password: password123 | Role: ${user.role}`
         );
      });

      process.exit();
   } catch (error) {
      console.error(error);
      process.exit(1);
   }
};

seedUsers();
