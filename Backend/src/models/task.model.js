import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, "Title is required"],
         trim: true,
         minlength: [3, "Title must be at least 3 characters"],
         maxlength: [50, "Title must be less than 50 characters"],
      },

      description: {
         type: String,
         trim: true,
         minlength: [3, "Description must be at least 3 characters"],
         maxlength: [500, "Description must be less than 500 characters"],
         required: [true, "Description is required"],
      },

      status: {
         type: String,
         enum: ["pending", "in-progress", "completed"],
         default: "pending",
      },

      dueDate: {
         type: Date,
      },

      priority: {
         type: String,
         enum: ["low", "medium", "high"],
         default: "medium",
      },

      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      assignedTo: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
