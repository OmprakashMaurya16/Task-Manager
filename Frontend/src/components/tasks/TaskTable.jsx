import TaskRow from "./TaskRow";
import TaskFilters from "./TaskFilters";

const TaskTable = ({
  tasks,
  loading,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Your Tasks</h3>
        <TaskFilters filters={filters} onChange={onFilterChange} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-500 border-b">
              <th className="pb-3 w-[40%]">TITLE</th>
              <th className="pb-3 w-[20%]">STATUS</th>
              <th className="pb-3 w-[15%]">PRIORITY</th>
              <th className="pb-3 w-[15%]">DUE DATE</th>
              <th className="pb-3 w-[10%] text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">
                  Loading...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
