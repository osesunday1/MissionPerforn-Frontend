import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import useDelete from '../hooks/useDelete';
import useUpdate from '../hooks/useUpdate';
import axios from 'axios';
import { toast } from 'react-toastify';

const TaskList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data: tasks, loading, error, refetch } = useFetch(`${apiUrl}/tasks/tasks`);
  const { deleteData } = useDelete(`${apiUrl}/tasks/tasks`, () => {
    toast.success('Task deleted');
    refetch();
  });
  const { updateData } = useUpdate(`${apiUrl}/tasks/tasks`, () => {
    toast.success('Task updated');
    refetch();
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (!searchId) {
      setFilteredTasks(tasks || []);
    } else {
      const match = tasks?.filter(task => task._id.includes(searchId.trim()));
      setFilteredTasks(match || []);
    }
  }, [tasks, searchId]);

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditPopup(true);
  };

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    deleteData(selectedTask._id);
    setShowDeletePopup(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateData(selectedTask._id, selectedTask);
    setShowEditPopup(false);
  };

  const handleInputChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  const clearAllTasks = async () => {
    const confirmed = window.confirm('Are you sure you want to delete all tasks?');
    if (!confirmed) return;
    try {
      const res = await axios.delete(`${apiUrl}/tasks/tasks`);
      toast.success(res.data.message || 'All tasks cleared');
      refetch();
    } catch (err) {
      toast.error('Failed to clear tasks');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">📋 View Your Tasks</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by Task ID..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={clearAllTasks}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Clear All Tasks
        </button>
      </div>

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {filteredTasks?.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-10">
                <p className="text-xl">No tasks found.</p>
                <p className="text-sm">Try adding a task or adjusting your search.</p>
            </div>
            )}

      <div className="grid gap-5 bg-secondary rounded-xl p-6 shadow-lg">
  {filteredTasks?.map((task) => (
    <div
      key={task._id}
      className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        {/* Task Info */}
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-1 break-all">
            <span className="font-semibold text-gray-600">Task ID:</span> {task._id}
          </p>
          <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              task.status === 'To Do'
                ? 'bg-yellow-100 text-yellow-800'
                : task.status === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {task.status}
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex gap-3 text-lg ml-4">
          <FaEdit
            className="text-blue-600 cursor-pointer hover:scale-110 transition"
            title="Edit"
            onClick={() => handleEdit(task)}
          />
          <FaTrash
            className="text-red-500 cursor-pointer hover:scale-110 transition"
            title="Delete"
            onClick={() => handleDelete(task)}
          />
        </div>
      </div>
    </div>
  ))}
</div>

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <input
              name="title"
              value={selectedTask.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              value={selectedTask.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <select
              name="status"
              value={selectedTask.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowEditPopup(false)} className="text-gray-600">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowDeletePopup(false)} className="text-gray-600">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
