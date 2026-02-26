import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import TaskForm from "../components/tasks/TaskForm";
import TaskTable from "../components/tasks/TaskTable";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const data = await fetchTasks(filters);
      setTasks(data);
      setLoading(false);
    };

    loadTasks();
  }, [filters]);

  const handleCreate = async (taskData) => {
    const created = await createTask(taskData);
    setTasks((prev) => [created, ...prev]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const handleUpdate = async (id, taskData) => {
    const updated = await updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-3">
        <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
        <p className="text-slate-500 mb-6">
          Manage your team's workflow and individual productivity.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Completed */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500">Completed</p>
              <p className="text-2xl font-bold text-slate-800">
                {tasks.filter((t) => t.status === "completed").length}
              </p>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500">In Progress</p>
              <p className="text-2xl font-bold text-slate-800">
                {tasks.filter((t) => t.status === "in-progress").length}
              </p>
            </div>
          </div>

          {/* Urgent */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500">Urgent</p>
              <p className="text-2xl font-bold text-slate-800">
                {tasks.filter((t) => t.priority === "high").length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="self-start">
            <TaskForm
              onCreate={handleCreate}
              editingTask={editingTask}
              onUpdate={handleUpdate}
              onCancelEdit={() => setEditingTask(null)}
            />
          </div>

          <div className="lg:col-span-2">
            <TaskTable
              tasks={tasks}
              loading={loading}
              filters={filters}
              onFilterChange={(e) =>
                setFilters({
                  ...filters,
                  [e.target.name]: e.target.value,
                })
              }
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
