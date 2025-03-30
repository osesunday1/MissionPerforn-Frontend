import React from 'react';
import useDelete from '../hooks/useDelete';

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { deleteItem, loading } = useDelete(`${apiUrl}/tasks/tasks`, onDelete);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteItem(task._id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500 mt-1">Status: {task.status}</p>
      <p className="text-xs text-gray-400">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;