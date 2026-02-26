import { Pencil, Trash2 } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const priorityStyles = {
  low: "text-slate-500",
  medium: "text-orange-500",
  high: "text-red-500",
};

const TaskRow = ({ task, onEdit, onDelete }) => {
  return (
    <tr className="border-b last:border-none">
      <td className="py-4 pr-4">
        <p className="font-medium">{task.title}</p>
        <p className="text-sm text-slate-500">{task.description}</p>
      </td>

      <td className="py-4">
        <span
          className={`px-3 py-1 text-xs rounded-full capitalize ${statusStyles[task.status]}`}
        >
          {task.status.replace("-", " ")}
        </span>
      </td>

      <td
        className={`py-4 text-sm capitalize ${priorityStyles[task.priority]}`}
      >
        {task.priority}
      </td>

      <td className="py-4 text-sm text-slate-600">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
      </td>

      <td className="py-4 text-right">
        <div className="flex justify-end gap-3">
          <Pencil
            onClick={() => onEdit(task)}
            className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-700"
          />
          <Trash2
            onClick={() => onDelete(task._id)}
            className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
