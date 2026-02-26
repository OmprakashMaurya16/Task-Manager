import Task from "../models/task.model.js";
import asyncHandler from "../utils/async.handler.js";
import ApiError from "../utils/api.error.js";
import sendResponse from "../utils/response.helper.js";

const createTask = asyncHandler(async (req, res) => {
   const { title, description, status, dueDate, priority, assignedTo } =
      req.body;

   if (assignedTo && req.user.role !== "admin") {
      throw new ApiError(403, "Only admin can assign tasks");
   }

   if (!title || !description) {
      throw new ApiError(400, "Title and description are required");
   }

   const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user.userId,
   });

   return sendResponse(res, 201, true, task, null, "Task created successfully");
});

const getTasks = asyncHandler(async (req, res) => {
   const { status, priority, sortBy } = req.query;

   const filter = {};

   if (status) filter.status = status;

   if (priority) filter.priority = priority;

   if (req.user.role !== "admin") {
      filter.$or = [
         { createdBy: req.user.userId },
         { assignedTo: req.user.userId },
      ];
   }

   const sortOptions = {};

   if (sortBy) {
      sortOptions[sortBy] = 1;
   }

   const tasks = await Task.find(filter).sort(sortOptions);

   return sendResponse(res, 200, "Tasks fetched successfully", tasks);
});

const updateTask = asyncHandler(async (req, res) => {
   const task = await Task.findById(req.params.id);

   if (!task) {
      throw new ApiError(404, "Task not found");
   }

   if (req.user.role !== "admin") {
      const isOwner = task.createdBy.toString() === req.user.userId;
      const isAssigned =
         task.assignedTo && task.assignedTo.toString() === req.user.userId;

      if (!isOwner && !isAssigned) {
         throw new ApiError(403, "Forbidden: You cannot update this task");
      }
   }

   Object.assign(task, req.body);

   await task.save();

   return sendResponse(res, 200, "Task updated successfully", task);
});

const deleteTask = asyncHandler(async (req, res) => {
   const task = await Task.findById(req.params.id);

   if (!task) {
      throw new ApiError(404, "Task not found");
   }

   if (req.user.role !== "admin") {
      const isOwner = task.createdBy.toString() === req.user.userId;

      if (!isOwner) {
         throw new ApiError(403, "Forbidden: You cannot delete this task");
      }
   }

   await task.deleteOne();

   return sendResponse(res, 200, "Task deleted successfully");
});

export { createTask, getTasks, updateTask, deleteTask };
