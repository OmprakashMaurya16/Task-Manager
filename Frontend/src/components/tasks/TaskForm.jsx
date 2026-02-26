import { useState, useEffect } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "pending",
  priority: "low",
  dueDate: "",
};

const TaskForm = ({ onCreate, editingTask, onUpdate, onCancelEdit }) => {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending",
        priority: editingTask.priority || "low",
        dueDate: editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask._id, form);
    } else {
      onCreate(form);
      setForm(EMPTY_FORM);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">
        {editingTask ? "Edit Task" : "Create Task"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="e.g. Design System Audit"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />

        <textarea
          name="description"
          placeholder="Describe the task requirements..."
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          {editingTask ? "Update Task" : "Create Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-full border border-slate-300 text-slate-600 py-2 rounded-md hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
