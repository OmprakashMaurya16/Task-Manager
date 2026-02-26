const TaskFilters = ({ filters, onChange }) => {
  return (
    <div className="flex gap-3">
      <select
        name="status"
        value={filters.status}
        onChange={onChange}
        className="border rounded-md px-3 py-1.5 text-sm"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={onChange}
        className="border rounded-md px-3 py-1.5 text-sm"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;
